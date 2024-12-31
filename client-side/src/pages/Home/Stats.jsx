const Stats = () => {
    return (
        <div>
            <h2 className="font-semibold mt-4 text-2xl text-slate-600 text-center">Statistics</h2>
            <div className="stats w-full items-center shadow">
                <div className="stat place-items-center">
                    <div className="stat-title">Books</div>
                    <div className="stat-value">11K</div>
                    <div className="stat-desc">From 2012 1st to Today</div>
                </div>

                <div className="stat place-items-center">
                    <div className="stat-title">Users</div>
                    <div className="stat-value text-secondary">4,200</div>
                    <div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
                </div>

                <div className="stat place-items-center">
                    <div className="stat-title">New Registers</div>
                    <div className="stat-value">1,200</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
            </div>
        </div>
    );
};

export default Stats;