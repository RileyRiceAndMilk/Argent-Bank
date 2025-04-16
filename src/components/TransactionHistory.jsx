import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TransactionHistory = ({ transactions }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleRow = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="transaction-history">
            {transactions.length > 0 ? (
                <table className="transactions-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((txn, index) => {
                            const isOpen = openIndex === index;
                            return (
                                <React.Fragment key={index}>
                                    <tr
                                        onClick={() => toggleRow(index)}
                                        className={`clickable-row ${isOpen ? 'row-expanded' : ''}`}
                                    >
                                        <td>
                                            <i
                                                className={`fa-solid fa-chevron-${isOpen ? 'up' : 'down'}`}
                                            ></i>
                                        </td>
                                        <td>{txn.date}</td>
                                        <td>{txn.description}</td>
                                        <td className={txn.amount < 0 ? 'negative' : 'positive'}>
                                            {`$${Math.abs(txn.amount).toFixed(2)}`}
                                        </td>
                                        <td>{`$${txn.balance.toFixed(2)}`}</td>
                                    </tr>
                                    {isOpen && (
                                        <tr className="transaction-details row-expanded">
                                            <td colSpan="5">
                                                <div className="details-box">
                                                    <p className="details-box-text">
                                                        Transaction Type : {txn.transactionType}
                                                    </p>
                                                    <p className="details-box-text">
                                                        Category : {txn.category}{' '}
                                                        <i className="fa-solid fa-pen"></i>
                                                    </p>
                                                    <p className="details-box-text">
                                                        Notes: <i className="fa-solid fa-pen"></i>
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <p>Aucune transaction trouvée.</p>
            )}
        </section>
    );
};

TransactionHistory.propTypes = {
    transactions: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired,
            balance: PropTypes.number.isRequired,
            transactionType: PropTypes.string,
            category: PropTypes.string,
            notes: PropTypes.string,
        })
    ).isRequired,
};

export default TransactionHistory;




