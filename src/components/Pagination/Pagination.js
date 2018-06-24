import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';
import Icon from '../Icon';
import Select from '../Select';
import SelectItem from '../SelectItem';
import { equals } from '../../tools/array';

let instanceId = 0;

export default class Pagination extends Component {
  static propTypes = {
    backwardText: PropTypes.string,
    className: PropTypes.string,
    itemRangeText: PropTypes.func,
    forwardText: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    itemsPerPageText: PropTypes.string,
    itemText: PropTypes.func,
    onChange: PropTypes.func,
    pageNumberText: PropTypes.string,
    pageRangeText: PropTypes.func,
    pageText: PropTypes.func,
    pageSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
    totalItems: PropTypes.number,
    disabled: PropTypes.bool,
    page: PropTypes.number,
    pageSize: PropTypes.number,
    pagesUnknown: PropTypes.bool,
    isLastPage: PropTypes.bool,
    pageInputDisabled: PropTypes.bool,
  };

  static defaultProps = {
    backwardText: 'Backward',
    itemRangeText: (min, max, total) => `${min}-${max} of ${total} items`,
    forwardText: 'Forward',
    itemsPerPageText: 'Items per page',
    pageNumberText: 'Page Number',
    pageRangeText: (current, total) => `${current} of ${total} pages`,
    disabled: false,
    page: 1,
    pagesUnknown: false,
    isLastPage: false,
    pageInputDisabled: false,
    itemText: (min, max) => `${min}-${max} items`,
    pageText: page => `page ${page}`,
  };

  state = {
    page: this.props.page,
    pageSize:
      this.props.pageSize && this.props.pageSizes.includes(this.props.pageSize)
        ? this.props.pageSize
        : this.props.pageSizes[0],
  };

  componentWillMount() {
    this.uniqueId = ++instanceId;
  }

  componentWillReceiveProps({ pageSizes, page, pageSize }) {
    if (!equals(pageSizes, this.props.pageSizes)) {
      this.setState({ pageSize: pageSizes[0], page: 1 });
    }
    if (page !== this.props.page) {
      this.setState({
        page,
      });
    }
    if (pageSize !== this.props.pageSize) {
      this.setState({ pageSize });
    }
  }

  handleSizeChange = evt => {
    const pageSize = Number(evt.target.value);
    this.setState({ pageSize, page: 1 });
    this.props.onChange({ page: 1, pageSize });
  };

  handlePageChange = evt => {
    this.setState({ page: evt.target.value });
  };

  handlePageInputChange = evt => {
    const page = Number(evt.target.value);
    if (
      page > 0 &&
      page <= Math.ceil(this.props.totalItems / this.state.pageSize)
    ) {
      this.setState({ page });
      this.props.onChange({ page, pageSize: this.state.pageSize });
    }
  };

  incrementPage = () => {
    const page = this.state.page + 1;
    this.setState({ page });
    this.props.onChange({ page, pageSize: this.state.pageSize });
  };

  decrementPage = () => {
    const page = this.state.page - 1;
    this.setState({ page });
    this.props.onChange({ page, pageSize: this.state.pageSize });
  };

  renderSelectItems = total => {
    let counter = 1;
    let itemArr = [];
    while (counter <= total) {
      itemArr.push(
        <SelectItem key={counter} value={counter} text={String(counter)} />
      );
      counter++;
    }
    return itemArr;
  };

  render() {
    const {
      backwardText,
      className,
      forwardText,
      id,
      itemsPerPageText,
      itemRangeText,
      pageRangeText,
      pageSize, // eslint-disable-line no-unused-vars
      pageSizes,
      itemText,
      pageText,
      pageNumberText, // eslint-disable-line no-unused-vars
      pagesUnknown,
      isLastPage,
      pageInputDisabled,
      totalItems,
      onChange, // eslint-disable-line no-unused-vars
      page: pageNumber, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;

    const statePage = this.state.page;
    const statePageSize = this.state.pageSize;
    const classNames = classnames('wfp--pagination', className);
    const backButtonClasses = classnames(
      'wfp--pagination__button',
      'wfp--pagination__button--backward',
      {
        'wfp--pagination__button--no-index': pageInputDisabled,
      }
    );
    const inputId = id || this.uniqueId;
    const totalPages = Math.ceil(totalItems / statePageSize);
    const selectItems = this.renderSelectItems(totalPages);

    return (
      <div className={classNames} {...other}>
        <div className="wfp--pagination__left">
          <span className="wfp--pagination__text">
            {itemsPerPageText}:&nbsp;&nbsp;
          </span>
          <Select
            id={`wfp-pagination-select-${inputId}`}
            labelText={itemsPerPageText}
            hideLabel
            inline
            onChange={this.handleSizeChange}
            value={statePageSize}>
            {pageSizes.map(size => (
              <SelectItem key={size} value={size} text={String(size)} />
            ))}
          </Select>
          <span className="wfp--pagination__text">
            &nbsp;|&nbsp;&nbsp;
            {pagesUnknown
              ? itemText(
                  statePageSize * (statePage - 1) + 1,
                  statePage * statePageSize
                )
              : itemRangeText(
                  statePageSize * (statePage - 1) + 1,
                  Math.min(statePage * statePageSize, totalItems),
                  totalItems
                )}
          </span>
        </div>
        <div className="wfp--pagination__right wfp--pagination--inline">
          <span className="wfp--pagination__text">
            {pagesUnknown
              ? pageText(statePage)
              : pageRangeText(statePage, Math.ceil(totalItems / statePageSize))}
          </span>
          <button
            className={backButtonClasses}
            onClick={this.decrementPage}
            description={backwardText}
            disabled={this.props.disabled || statePage === 1}
          />
          {pageInputDisabled ? null : (
            <Select
              id={`wfp-pagination-select-${inputId + 2}`}
              labelText={itemsPerPageText}
              hideLabel
              inline
              onChange={this.handlePageInputChange}
              value={statePage}>
              {selectItems}
            </Select>
          )}
          <button
            className="wfp--pagination__button wfp--pagination__button--forward"
            onClick={this.incrementPage}
            description={forwardText}
            disabled={
              this.props.disabled ||
              statePage === Math.ceil(totalItems / statePageSize) ||
              isLastPage
            }
          />
        </div>
      </div>
    );
  }
}
