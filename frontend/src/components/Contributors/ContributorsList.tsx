import React from 'react';
import ContributorCard from './ContributorCard';
import type { Contributor } from './types';

// Define the type for the component's props
type ContributorsListProps = {
    contributors: Contributor[];
};

const ContributorsList: React.FC<ContributorsListProps> = ({ contributors }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {contributors.map((contributor) => (
                <ContributorCard key={contributor.id} contributor={contributor} />
            ))}
        </div>
    );
};

export default ContributorsList;