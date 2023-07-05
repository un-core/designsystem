import React, { useState, ChangeEvent } from 'react';
import classnames from 'classnames';
import { ChevronLeft, ChevronRight } from '@un/icons-react';
import Select from '../Select';
import SelectItem from '../SelectItem';
// import { equals } from '../../tools/array';

interface PaginationProps {
  backwardText?: string;
  className?: string;
  itemRangeText?: (min: number, max: number, total: number) => string;
  forwardText?: string;
  id?: string | number;
  itemsPerPageText?: string;
  itemsPerPageFollowsText?: string;
  itemText?: (min: number, max: number) => string;
  onChange?: (params: { page: number; pageSize: number }) => void;
  pageRangeText?: (current: number, total: number) => string;
  pageText?: (page: number) => string;
  pageSizes: number[];
  pageSizesDisabled?: boolean;
  totalItems?: number;
  disabled?: boolean;
  page?: number;
  pageSize?: number;
  pageNumberText?: string;
  pagesUnknown?: boolean;
  isLastPage?: boolean;
  pageInputDisabled?: boolean;
}

let instanceId = 0;

const Pagination: React.FC<PaginationProps> = (props) => {
  const {
    backwardText = 'Backward',
    className,
    forwardText = 'Forward',
    id,
    itemsPerPageText = 'Items per page:',
    itemsPerPageFollowsText,
    itemRangeText = (min, max, total) => `${min}-${max} of ${total} items`,
    pageRangeText = (current, total) => `${current} of ${total} pages`,
    pageSize, //eslint-disable-line
    pageSizesDisabled,
    pageSizes,
    itemText = (min, max) => `${min}-${max} items`,
    pageText = (page) => `page ${page}`,
    pageNumberText = 'Page Number', //eslint-disable-line
    pagesUnknown = false,
    isLastPage = false,
    pageInputDisabled = false,
    totalItems,
    onChange,
    page: pageNumber = 1,
    ...other
  } = props;

  const [page, setPage] = useState<number>(pageNumber);
  const [pageSizeState, setPageSize] = useState<number>(
    props.pageSize ? props.pageSize : pageSizes[0]
  );
  const uniqueId = useState<number>(() => ++instanceId)[0];

  const handleSizeChange = (evt: ChangeEvent<HTMLSelectElement>) => {
    const pageSize = Number(evt.target.value);
    setPage(1);
    setPageSize(pageSize);
    onChange?.({ page: 1, pageSize });
  };

  // const handlePageChange = (evt: ChangeEvent<HTMLSelectElement>) => {
  //   setPage(Number(evt.target.value));
  // };

  const handlePageInputChange = (evt: ChangeEvent<HTMLSelectElement>) => {
    const page = Number(evt.target.value);
    if (
      page > 0 &&
      page <= Math.max(Math.ceil(totalItems! / pageSizeState), 1)
    ) {
      setPage(page);
      onChange?.({ page, pageSize: pageSizeState });
    }
  };

  const incrementPage = () => {
    const newPage = page + 1;
    setPage(newPage);
    onChange?.({ page: newPage, pageSize: pageSizeState });
  };

  const decrementPage = () => {
    const newPage = page - 1;
    setPage(newPage);
    onChange?.({ page: newPage, pageSize: pageSizeState });
  };

  const renderSelectItems = (total: number) => {
    let counter = 1;
    const itemArr: React.ReactNode[] = [];
    while (counter <= total) {
      itemArr.push(
        <SelectItem key={counter} value={counter} text={String(counter)} />
      );
      counter++;
    }
    return itemArr;
  };

  const classNames = classnames('wfp--pagination', className);
  const backButtonClasses = classnames(
    'wfp--pagination__button',
    'wfp--pagination__button--backward',
    {
      'wfp--pagination__button--no-index': pageInputDisabled,
    }
  );
  const inputId = id || uniqueId;
  const totalPages = Math.max(Math.ceil(totalItems! / pageSizeState), 1);
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
              value={pageSizeState}>
              {pageSizes.map((size) => (
                <SelectItem key={size} value={size} text={String(size)} />
              ))}
            </Select>
            <span className="wfp--pagination__text">
              {' '}
              &nbsp;&nbsp;|&nbsp;&nbsp;
            </span>
          </React.Fragment>
        )}
        <span className="wfp--pagination__text">
          {pagesUnknown
            ? itemText!(pageSizeState * (page - 1) + 1, page * pageSizeState)
            : itemRangeText!(
                Math.min(pageSizeState * (page - 1) + 1, totalItems!),
                Math.min(page * pageSizeState!, totalItems!),
                totalItems!
              )}
        </span>
      </div>
      <div className="wfp--pagination__right wfp--pagination--inline">
        <span className="wfp--pagination__text">
          {pagesUnknown ? pageText!(page) : pageRangeText!(page, totalPages)}
        </span>
        <button
          className={backButtonClasses}
          onClick={decrementPage}
          disabled={props.disabled || page === 1}>
          <ChevronLeft
            className="wfp--pagination__button-icon"
            description={backwardText}
          />
        </button>
        {pageInputDisabled ? null : (
          <Select
            id={`wfp-pagination-select-${+inputId + 2}`}
            labelText={itemsPerPageText}
            hideLabel
            inline
            onChange={handlePageInputChange}
            value={page}>
            {selectItems}
          </Select>
        )}
        <button
          className="wfp--pagination__button wfp--pagination__button--forward"
          onClick={incrementPage}
          disabled={props.disabled || page === totalPages || isLastPage}>
          <ChevronRight
            className="wfp--pagination__button-icon"
            description={forwardText}
          />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
