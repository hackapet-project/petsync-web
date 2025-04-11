import React from 'react';

interface StatCardProps {
    title: string;
    value: number;
    change: string;
    isPositive: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, isPositive }) => {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 font-medium mb-2">{title}</h3>
            <div className="text-4xl font-bold mb-2">{value}</div>
            <div className={`text-sm ${isPositive ? 'text-green-500' : 'text-yellow-500'}`}>
                {isPositive ? '↑' : '='} {change}
            </div>
        </div>
    );
};

export default StatCard;