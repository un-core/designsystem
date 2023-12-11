import PropTypes from "prop-types";
import React, { useState } from "react";
import classnames from "classnames";
import { ChevronLeft, ChevronRight } from "@wfp/icons-react";
import Select from "../Select";
import SelectItem from "../SelectItem";
import { equals } from "../../tools/array";

let instanceId = 0;

function Pagination(props) {
  const {
    backwardText,
    className,
    forwardText,
    id,
    itemsPerPageText,
    itemsPerPageFollowsText,
    itemRangeText,
    pageRangeText,
    pageSize,
    pageSizesDisabled,
    pageSizes,
    itemText,
    pageText,
    pageNumberText,
    pagesUnknown,
    isLastPage,
    pageInputDisabled,
    totalItems,
    onChange,
    page: pageNumber,
    ...other
  } = props;

  const [page, setPage] = useState(pageNumber);
  const [pageSizeState, setPageSize] = useState(
    props.pageSize ? props.pageSize : pageSizes[0]
  );
  const uniqueId = useState(() => ++instanceId)[0];

  const handleSizeChange = (evt) => {
    const pageSize = Number(evt.target.value);
    setPage(1);
    setPageSize(pageSize);
    onChange({ page: 1, pageSize });
  };

  const handlePageChange = (evt) => {
    setPage(evt.target.value);
  };

  const handlePageInputChange = (evt) => {
    const page = Number(evt.target.value);
    if (
      page > 0 &&
      page <= Math.max(Math.ceil(totalItems / pageSizeState), 1)
    ) {
      setPage(page);
      onChange({ page, pageSize: pageSizeState });
    }
  };

  const incrementPage = () => {
    const newPage = page + 1;
    setPage(newPage);
    onChange({ page: newPage, pageSize: pageSizeState });
  };

  const decrementPage = () => {
    const newPage = page - 1;
    setPage(newPage);
    onChange({ page: newPage, pageSize: pageSizeState });
  };

  const renderSelectItems = (total) => {
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

  const classNames = classnames("wfp--pagination", className);
  const backButtonClasses = classnames(
    "wfp--pagination__button",
    "wfp--pagination__button--backward",
    {
      "wfp--pagination__button--no-index": pageInputDisabled,
    }
  );
  const inputId = id || uniqueId;
  const totalPages = Math.max(Math.ceil(totalItems / pageSizeState), 1);
  const selectItems = renderSelectItems(totalPages);

  return (
    <div className={classNames} {...other}>
      <div className="wfp--pagination__left">
        {!pageSizesDisabled && (
          <React.Fragment>
            <span className="wfp--pagination__text">
              {itemsPerPageFollowsText || itemsPerPageText}
            </span>
            <Select
              id={`wfp-pagination-select-${inputId}`}
              labelText={itemsPerPageText}
              hideLabel
              inline
              onChange={handleSizeChange}
              value={pageSizeState}
            >
              {pageSizes.map((size) => (
                <SelectItem key={size} value={size} text={String(size)} />
              ))}
            </Select>
            <span className="wfp--pagination__text">
              {" "}
              &nbsp;&nbsp;|&nbsp;&nbsp;
            </span>
          </React.Fragment>
        )}
        <span className="wfp--pagination__text">
          {pagesUnknown
            ? itemText(pageSizeState * (page - 1) + 1, page * pageSizeState)
            : itemRangeText(
                Math.min(pageSizeState * (page - 1) + 1, totalItems),
                Math.min(page * pageSizeState, totalItems),
                totalItems
              )}
        </span>
      </div>
      <div className="wfp--pagination__right wfp--pagination--inline">
        <span className="wfp--pagination__text">
          {pagesUnknown ? pageText(page) : pageRangeText(page, totalPages)}
        </span>
        <button
          className={backButtonClasses}
          onClick={decrementPage}
          disabled={props.disabled || page === 1}
        >
          <ChevronLeft
            className="wfp--pagination__button-icon"
            description={backwardText}
          />
        </button>
        {pageInputDisabled ? null : (
          <Select
            id={`wfp-pagination-select-${inputId + 2}`}
            labelText={itemsPerPageText}
            hideLabel
            inline
            onChange={handlePageInputChange}
            value={page}
          >
            {selectItems}
          </Select>
        )}
        <button
          className="wfp--pagination__button wfp--pagination__button--forward"
          onClick={incrementPage}
          disabled={props.disabled || page === totalPages || isLastPage}
        >
          <ChevronRight
            className="wfp--pagination__button-icon"
            description={forwardText}
          />
        </button>
      </div>
    </div>
  );
}

Pagination.propTypes = {
  backwardText: PropTypes.string,
  className: PropTypes.string,
  itemRangeText: PropTypes.func,
  forwardText: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  itemsPerPageText: PropTypes.string,
  itemsPerPageFollowsText: PropTypes.string,
  itemText: PropTypes.func,
  onChange: PropTypes.func,
  pageRangeText: PropTypes.func,
  pageText: PropTypes.func,
  pageSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  pageSizesDisabled: PropTypes.bool,
  totalItems: PropTypes.number,
  disabled: PropTypes.bool,
  page: PropTypes.number,
  pageSize: PropTypes.number,
  pagesUnknown: PropTypes.bool,
  isLastPage: PropTypes.bool,
  pageInputDisabled: PropTypes.bool,
};

Pagination.defaultProps = {
  backwardText: "Backward",
  itemRangeText: (min, max, total) => `${min}-${max} of ${total} items`,
  forwardText: "Forward",
  itemsPerPageText: "Items per page:",
  pageNumberText: "Page Number",
  pageRangeText: (current, total) => `${current} of ${total} pages`,
  disabled: false,
  page: 1,
  pagesUnknown: false,
  pageSizes: [10, 20, 50],
  isLastPage: false,
  pageInputDisabled: false,
  itemText: (min, max) => `${min}-${max} items`,
  pageText: (page) => `page ${page}`,
};

export default Pagination;
