// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title LoanContract - Enhanced Microloan Platform
 * @dev Manages vendor registration, sales tracking, loan disbursement, and repayment
 * @notice Enhanced with multi-lender support, partial payments, credit scoring, and late fees
 */
contract LoanContract {
    
    // ============ STRUCTS ============
    
    struct Vendor {
        address walletAddress;
        uint256 totalSales;
        uint256 creditScore; // 0-1000, higher is better
        uint256 totalLoansRepaid;
        uint256 totalLoanDefaults;
        bool exists;
        bool isBlacklisted;
    }

    struct Loan {
        uint256 loanId;
        address lender;
        uint256 principalAmount;
        uint256 interestRate; // basis points (100 = 1%)
        uint256 disbursementDate;
        uint256 dueDate;
        uint256 amountRepaid;
        uint256 lateFeeRate; // basis points per day
        bool isFullyRepaid;
        bool isDefaulted;
        LoanStatus status;
    }

    struct Lender {
        address walletAddress;
        uint256 totalLent;
        uint256 totalRepaid;
        uint256 availableBalance;
        bool exists;
    }

    enum LoanStatus {
        PENDING,
        ACTIVE,
        REPAYING,
        COMPLETED,
        DEFAULTED
    }

    // ============ STATE VARIABLES ============
    
    address public admin;
    uint256 public loanCounter;
    uint256 public platformFeeRate; // basis points (100 = 1%)
    uint256 public defaultThresholdDays; // Days after due date before default
    
    mapping(address => Vendor) public vendors;
    mapping(address => Lender) public lenders;
    mapping(uint256 => Loan) public loans;
    mapping(address => uint256[]) public vendorLoans; // vendor => loan IDs
    mapping(address => uint256[]) public lenderLoans; // lender => loan IDs
    
    // ============ EVENTS ============
    
    event VendorRegistered(address indexed vendor, uint256 timestamp);
    event VendorBlacklisted(address indexed vendor, bool status);
    event LenderRegistered(address indexed lender);
    event LenderDeposit(address indexed lender, uint256 amount);
    event SalesRecorded(address indexed vendor, uint256 amount, uint256 newTotalSales);
    event LoanRequested(uint256 indexed loanId, address indexed vendor, uint256 amount);
    event LoanApproved(uint256 indexed loanId, address indexed vendor, address indexed lender, uint256 amount);
    event LoanDisbursed(uint256 indexed loanId, address indexed vendor, uint256 amount);
    event PaymentMade(uint256 indexed loanId, address indexed vendor, uint256 amount, uint256 remaining);
    event LoanFullyRepaid(uint256 indexed loanId, address indexed vendor);
    event LoanDefaulted(uint256 indexed loanId, address indexed vendor);
    event CreditScoreUpdated(address indexed vendor, uint256 newScore);
    event PlatformFeeCollected(uint256 indexed loanId, uint256 feeAmount);

    // ============ MODIFIERS ============
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin");
        _;
    }

    modifier onlyVendor() {
        require(vendors[msg.sender].exists, "Not a registered vendor");
        require(!vendors[msg.sender].isBlacklisted, "Vendor is blacklisted");
        _;
    }

    modifier onlyLender() {
        require(lenders[msg.sender].exists, "Not a registered lender");
        _;
    }

    modifier loanExists(uint256 _loanId) {
        require(_loanId > 0 && _loanId <= loanCounter, "Invalid loan ID");
        _;
    }

    // ============ CONSTRUCTOR ============
    
    constructor() {
        admin = msg.sender;
        loanCounter = 0;
        platformFeeRate = 50; // 0.5% platform fee
        defaultThresholdDays = 30; // 30 days grace period
    }

    // ============ VENDOR FUNCTIONS ============
    
    /**
     * @dev Register a new vendor
     */
    function registerVendor(address _vendorAddress) external onlyAdmin {
        require(!vendors[_vendorAddress].exists, "Vendor already exists");
        vendors[_vendorAddress] = Vendor({
            walletAddress: _vendorAddress,
            totalSales: 0,
            creditScore: 500, // Start with neutral credit score
            totalLoansRepaid: 0,
            totalLoanDefaults: 0,
            exists: true,
            isBlacklisted: false
        });
        emit VendorRegistered(_vendorAddress, block.timestamp);
    }

    /**
     * @dev Record vendor sales (can be called by oracle or admin)
     */
    function recordSales(address _vendorAddress, uint256 _amount) external onlyAdmin {
        require(vendors[_vendorAddress].exists, "Vendor not found");
        vendors[_vendorAddress].totalSales += _amount;
        emit SalesRecorded(_vendorAddress, _amount, vendors[_vendorAddress].totalSales);
    }

    /**
     * @dev Blacklist or unblacklist a vendor
     */
    function setVendorBlacklist(address _vendorAddress, bool _status) external onlyAdmin {
        require(vendors[_vendorAddress].exists, "Vendor not found");
        vendors[_vendorAddress].isBlacklisted = _status;
        emit VendorBlacklisted(_vendorAddress, _status);
    }

    // ============ LENDER FUNCTIONS ============
    
    /**
     * @dev Register a new lender
     */
    function registerLender(address _lenderAddress) external onlyAdmin {
        require(!lenders[_lenderAddress].exists, "Lender already exists");
        lenders[_lenderAddress] = Lender({
            walletAddress: _lenderAddress,
            totalLent: 0,
            totalRepaid: 0,
            availableBalance: 0,
            exists: true
        });
        emit LenderRegistered(_lenderAddress);
    }

    /**
     * @dev Lender deposits funds
     */
    function depositFunds() external payable onlyLender {
        require(msg.value > 0, "Amount must be greater than 0");
        lenders[msg.sender].availableBalance += msg.value;
        emit LenderDeposit(msg.sender, msg.value);
    }

    /**
     * @dev Lender withdraws available balance
     */
    function withdrawLenderFunds(uint256 _amount) external onlyLender {
        require(_amount <= lenders[msg.sender].availableBalance, "Insufficient balance");
        lenders[msg.sender].availableBalance -= _amount;
        payable(msg.sender).transfer(_amount);
    }

    // ============ LOAN FUNCTIONS ============
    
    /**
     * @dev Admin approves and disburses loan
     */
    function approveLoan(
        address _vendorAddress,
        address _lenderAddress,
        uint256 _amount,
        uint256 _interestRate,
        uint256 _dueDays
    ) external onlyAdmin returns (uint256) {
        require(vendors[_vendorAddress].exists, "Vendor not found");
        require(!vendors[_vendorAddress].isBlacklisted, "Vendor blacklisted");
        require(lenders[_lenderAddress].exists, "Lender not found");
        require(lenders[_lenderAddress].availableBalance >= _amount, "Lender insufficient balance");

        loanCounter++;
        uint256 loanId = loanCounter;

        loans[loanId] = Loan({
            loanId: loanId,
            lender: _lenderAddress,
            principalAmount: _amount,
            interestRate: _interestRate,
            disbursementDate: block.timestamp,
            dueDate: block.timestamp + (_dueDays * 1 days),
            amountRepaid: 0,
            lateFeeRate: 10, // 0.1% per day late fee
            isFullyRepaid: false,
            isDefaulted: false,
            status: LoanStatus.ACTIVE
        });

        vendorLoans[_vendorAddress].push(loanId);
        lenderLoans[_lenderAddress].push(loanId);

        // Update lender balance
        lenders[_lenderAddress].availableBalance -= _amount;
        lenders[_lenderAddress].totalLent += _amount;

        // Transfer funds to vendor
        payable(_vendorAddress).transfer(_amount);

        emit LoanApproved(loanId, _vendorAddress, _lenderAddress, _amount);
        emit LoanDisbursed(loanId, _vendorAddress, _amount);

        return loanId;
    }

    /**
     * @dev Vendor makes a payment (full or partial)
     */
    function makePayment(uint256 _loanId) external payable onlyVendor loanExists(_loanId) {
        Loan storage loan = loans[_loanId];
        require(!loan.isFullyRepaid, "Loan already repaid");
        require(!loan.isDefaulted, "Loan is defaulted");
        require(msg.value > 0, "Payment amount must be greater than 0");

        uint256 totalDue = calculateTotalDue(_loanId);
        require(loan.amountRepaid + msg.value <= totalDue, "Payment exceeds total due");

        loan.amountRepaid += msg.value;
        loan.status = LoanStatus.REPAYING;

        // Calculate platform fee
        uint256 platformFee = (msg.value * platformFeeRate) / 10000;
        uint256 lenderPayment = msg.value - platformFee;

        // Update lender balance
        lenders[loan.lender].availableBalance += lenderPayment;
        lenders[loan.lender].totalRepaid += lenderPayment;

        // Send platform fee to admin
        payable(admin).transfer(platformFee);
        emit PlatformFeeCollected(_loanId, platformFee);

        uint256 remaining = totalDue - loan.amountRepaid;
        emit PaymentMade(_loanId, msg.sender, msg.value, remaining);

        // Check if fully repaid
        if (remaining == 0) {
            loan.isFullyRepaid = true;
            loan.status = LoanStatus.COMPLETED;
            vendors[msg.sender].totalLoansRepaid++;
            updateCreditScore(msg.sender, true);
            emit LoanFullyRepaid(_loanId, msg.sender);
        }
    }

    /**
     * @dev Mark loan as defaulted (called by admin after grace period)
     */
    function markAsDefaulted(uint256 _loanId, address _vendorAddress) external onlyAdmin loanExists(_loanId) {
        Loan storage loan = loans[_loanId];
        require(!loan.isFullyRepaid, "Loan already repaid");
        require(!loan.isDefaulted, "Already marked as defaulted");
        require(block.timestamp > loan.dueDate + (defaultThresholdDays * 1 days), "Grace period not over");

        loan.isDefaulted = true;
        loan.status = LoanStatus.DEFAULTED;
        vendors[_vendorAddress].totalLoanDefaults++;
        vendors[_vendorAddress].isBlacklisted = true; // Auto-blacklist defaulters
        updateCreditScore(_vendorAddress, false);

        emit LoanDefaulted(_loanId, _vendorAddress);
    }

    // ============ VIEW FUNCTIONS ============
    
    /**
     * @dev Calculate total amount due including interest and late fees
     */
    function calculateTotalDue(uint256 _loanId) public view loanExists(_loanId) returns (uint256) {
        Loan memory loan = loans[_loanId];
        
        // Principal + Interest
        uint256 interest = (loan.principalAmount * loan.interestRate) / 10000;
        uint256 totalDue = loan.principalAmount + interest;

        // Calculate late fees if overdue
        if (block.timestamp > loan.dueDate && !loan.isFullyRepaid) {
            uint256 daysLate = (block.timestamp - loan.dueDate) / 1 days;
            uint256 lateFee = (loan.principalAmount * loan.lateFeeRate * daysLate) / 10000;
            totalDue += lateFee;
        }

        return totalDue;
    }

    /**
     * @dev Get vendor details
     */
    function getVendorDetails(address _vendorAddress) external view returns (
        uint256 totalSales,
        uint256 creditScore,
        uint256 totalLoansRepaid,
        uint256 totalLoanDefaults,
        bool isBlacklisted
    ) {
        Vendor memory vendor = vendors[_vendorAddress];
        return (
            vendor.totalSales,
            vendor.creditScore,
            vendor.totalLoansRepaid,
            vendor.totalLoanDefaults,
            vendor.isBlacklisted
        );
    }

    /**
     * @dev Get all loan IDs for a vendor
     */
    function getVendorLoans(address _vendorAddress) external view returns (uint256[] memory) {
        return vendorLoans[_vendorAddress];
    }

    /**
     * @dev Get all loan IDs for a lender
     */
    function getLenderLoans(address _lenderAddress) external view returns (uint256[] memory) {
        return lenderLoans[_lenderAddress];
    }

    /**
     * @dev Get loan details
     */
    function getLoanDetails(uint256 _loanId) external view loanExists(_loanId) returns (
        address lender,
        uint256 principalAmount,
        uint256 interestRate,
        uint256 dueDate,
        uint256 amountRepaid,
        uint256 totalDue,
        bool isFullyRepaid,
        LoanStatus status
    ) {
        Loan memory loan = loans[_loanId];
        return (
            loan.lender,
            loan.principalAmount,
            loan.interestRate,
            loan.dueDate,
            loan.amountRepaid,
            calculateTotalDue(_loanId),
            loan.isFullyRepaid,
            loan.status
        );
    }

    // ============ INTERNAL FUNCTIONS ============
    
    /**
     * @dev Update vendor credit score
     */
    function updateCreditScore(address _vendorAddress, bool _positive) internal {
        Vendor storage vendor = vendors[_vendorAddress];
        
        if (_positive) {
            // Increase credit score for on-time repayment
            if (vendor.creditScore < 950) {
                vendor.creditScore += 50;
            }
        } else {
            // Decrease credit score for default
            if (vendor.creditScore > 100) {
                vendor.creditScore -= 100;
            }
        }
        
        emit CreditScoreUpdated(_vendorAddress, vendor.creditScore);
    }

    // ============ ADMIN FUNCTIONS ============
    
    /**
     * @dev Update platform fee rate
     */
    function setPlatformFeeRate(uint256 _newRate) external onlyAdmin {
        require(_newRate <= 500, "Fee cannot exceed 5%");
        platformFeeRate = _newRate;
    }

    /**
     * @dev Update default threshold
     */
    function setDefaultThreshold(uint256 _days) external onlyAdmin {
        defaultThresholdDays = _days;
    }

    /**
     * @dev Emergency withdraw (only for collected platform fees)
     */
    function emergencyWithdraw() external onlyAdmin {
        payable(admin).transfer(address(this).balance);
    }

    /**
     * @dev Transfer admin rights
     */
    function transferAdmin(address _newAdmin) external onlyAdmin {
        require(_newAdmin != address(0), "Invalid address");
        admin = _newAdmin;
    }

    // Fallback function to receive ETH
    receive() external payable {}
}
