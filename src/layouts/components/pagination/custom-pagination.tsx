import React from 'react';
import { Pagination as PaginationType } from "@/interfaces/review-jobs-response.interface";

interface PaginationProps {
    pagination?: PaginationType;
    onPageChange: (page: number) => void;
}

const CustomPagination: React.FC<PaginationProps> = ({ pagination = { page: 1, perPage: 10, totalPages: 1, totalCount: 0 }, onPageChange }) => {
    const { page, totalPages } = pagination;

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            onPageChange(newPage);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    className={`px-3 py-1 rounded ${page === i ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <div className="flex justify-center items-center space-x-2 mt-4 pagination">
            <button
                className="rounded bg-gray-200 text-gray-700"
                onClick={() => handlePageChange(page - 1)}
                disabled={page <= 1}
            >
                &lt;
            </button>
            {renderPageNumbers()}
            <button
                className="rounded bg-gray-200 text-gray-700"
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= totalPages}
            >
                &gt;
            </button>
        </div>
    );
};

export default CustomPagination;
