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
                        {transactions.map((txn, index) => (
                            <React.Fragment key={index}>
                                <tr onClick={() => toggleRow(index)} className="clickable-row">

                                    <i
                                        className={`fa-solid fa-chevron-${openIndex === index ? 'up' : 'down'}`}
                                    ></i>
                                    <td>{txn.date}</td>
                                    <td>{txn.description}</td>
                                    <td className={txn.amount < 0 ? 'negative' : 'positive'}>
                                        {`$${Math.abs(txn.amount).toFixed(2)}`}
                                    </td>
                                    <td>{`$${txn.balance.toFixed(2)}`}</td>
                                </tr>
                                {openIndex === index && (
                                    <tr className="transaction-details">
                                        <td colSpan="5">
                                            <div className="details-box">
                                                <p className="details-box-text">Transaction Type : {txn.transactionType}</p>
                                                <p className="details-box-text">Category : {txn.category}<i class="fa-solid fa-pen"></i></p>
                                                <p className="details-box-text">Notes: <i class="fa-solid fa-pen"></i></p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
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



