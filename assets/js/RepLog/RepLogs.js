import React from "react";
import RepLogList from "./RepLogList";
import PropTypes from 'prop-types';

function calculateTotalWeight(repLogs) {
    let total = 0;

    for(let repLog of repLogs) {
        total += repLog.totalWeightLifted;
    }

    return total;
}

const calculatetotalWeightFancier = repLogs => repLogs.reduce((total, log) => total + log.totalWeightLifted, 0);

export default function RepLogs(props) {
    const { withHeart, highlightedRowId, onRowClick, repLogs } = props;

    let heart = '';
    if (withHeart) {
        heart = <span>❤️</span>;
    }

    return (
        <div className="col-md-7">
            <h2>Lift History! {heart}</h2>

            <table className="table table-striped">
                <thead>
                <tr>
                    <th>What</th>
                    <th>How many times?</th>
                    <th>Weight</th>
                    <th>&nbsp;</th>
                </tr>
                </thead>
                <RepLogList
                    highlightedRowId={highlightedRowId}
                    onRowClick={onRowClick}
                    repLogs={repLogs}
                />
                <tfoot>
                <tr>
                    <td>&nbsp;</td>
                    <th>Total</th>
                    <th>{calculatetotalWeightFancier(repLogs)}</th>
                    <td>&nbsp;</td>
                </tr>
                </tfoot>
            </table>
            <form className="form-inline js-new-rep-log-form">
                <div className="form-group">
                    <label className="sr-only control-label required">
                        What did you lift?
                    </label>
                    <select id="rep_log_item"
                            name="item"
                            required="required"
                            className="form-control">
                        <option value="">What did you lift?</option>
                        <option value="cat">Cat</option>
                        <option value="fat_cat">Big Fat Cat</option>
                        <option value="laptop">My Laptop</option>
                        <option value="coffee_cup">Coffee Cup</option>
                    </select>
                </div>
                {' '}
                <div className="form-group">
                    <label className="sr-only control-label required">
                        How many times?
                    </label>
                    <input type="number" id="rep_log_reps"
                           name="reps" required="required"
                           placeholder="How many times?"
                           className="form-control"/>
                </div>
                {' '}
                <button type="submit" className="btn btn-primary">I Lifted it!</button>
            </form>
        </div>
    );
}

RepLogs.propTypes = {
    withHeart: PropTypes.bool,
    highlightedRowId: PropTypes.any,
    onRowClick: PropTypes.func.isRequired,
    repLogs: PropTypes.array.isRequired
};