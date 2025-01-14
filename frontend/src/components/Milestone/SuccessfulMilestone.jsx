const HeaderSection = ({ milestone }) => {
    return (
        <div className="bg-teal-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-teal-800">Milestone Completion</h2>
            <span className="text-green-600 text-lg">Success</span>
        </div>

    );
};

const MilestoneDetails = ({ milestone }) => {
    return (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold">Milestone: Build MVP</h3>
            <p className="mt-2 text-gray-600">This milestone involved building the Minimum Viable Product (MVP) for the platform.</p>
            <div className="flex justify-between mt-4">
                <div className="text-sm text-gray-500">Started: Sept 1, 2024</div>
                <div className="text-sm text-gray-500">Completed: Oct 1, 2024</div>
            </div>
        </div>

    );
};

const DonorList = ({ donors }) => {
    return (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold">Donors</h3>
            <ul className="mt-4">
                {donors.map((donor, index) => (
                    <li key={index} className="flex justify-between text-gray-700 mt-2">
                        <span>{donor.name}</span>
                        <span>${donor.amount.toFixed(2)} (-5% fees)</span>
                    </li>
                ))}
            </ul>
        </div>

    );
};

const FeesPayout = ({ donors }) => {
    return (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold">Payout Details</h3>
            <div className="flex justify-between text-gray-700 mt-2">
                <span>Total Raised</span>
                <span>$5000.00</span>
            </div>
            <div className="flex justify-between text-gray-700 mt-2">
                <span>Platform Fees (5%)</span>
                <span>-$250.00</span>
            </div>
            <div className="flex justify-between text-gray-700 mt-2 font-bold">
                <span>Final Payout</span>
                <span>$4750.00</span>
            </div>
        </div>

    );
};

const TransactionId = ({ transactionId }) => {
    return (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold">Transaction ID</h3>
            <p className="text-gray-600 mt-2">0x123456789abcdef123456789abcdef</p>
        </div>

    );
};


const SuccessfulMilestone = () => {

    const dummyMilestone = {
        title: "Build MVP",
        description: "Completed the Minimum Viable Product (MVP) for the crowdfunding platform.",
        startDate: "2024-09-01",
        endDate: "2024-10-01",
        amountRaised: 5000,
        platformFeePercent: 0.05,
    };

    const dummyDonors = [
        { name: "Alice Johnson", amount: 1000 },
        { name: "Bob Smith", amount: 1500 },
        { name: "Charlie Davis", amount: 500 },
        { name: "Dana Lee", amount: 2000 },
    ];

    const dummyTransactionId = "0x123456789abcdef123456789abcdef";

    const platformFeePercent = 0.05;

    const calculateFees = (amount) => {
        return amount * platformFeePercent;
    };

    const calculatePayout = (amount) => {
        return amount - calculateFees(amount);
    };

    return (
        <div className="container mx-auto p-6">
            <HeaderSection milestone={dummyMilestone} />
            <dummyMetails milestone={dummyMilestone} />
            <DonorList donors={dummyDonors} />
            <FeesPayout donors={dummyDonors} />
            <TransactionId transactionId={dummyTransactionId} />
        </div>
    );
};


export default SuccessfulMilestone;