import qs from "query-string";

import {
  DEFAULT_ROW_PER_PAGE,
  ROW_PER_PAGE_OPTIONS,
} from "src/constants/constants";

class UrlServiceClass {
  setQueryStringWithoutPageReload = (qsValue) => {
    const newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}${qsValue}`;
    window.history.replaceState({ path: newurl }, "", newurl);
  };

  setQueryParameters(keyValuePair, queryString = window.location.search) {
    const values = qs.parse(queryString);
    const updatedKeyValuePair = { ...values, ...keyValuePair };
    Object.keys(updatedKeyValuePair).forEach(
      (key) => !updatedKeyValuePair[key] && delete updatedKeyValuePair[key]
    );
    const newQsValue = qs.stringify({ ...updatedKeyValuePair });
    Object.keys(newQsValue).length &&
      this.setQueryStringWithoutPageReload(`?${newQsValue}`);
  }

  getQueryStringValue = (key, queryString = window.location.search) => {
    const values = qs.parse(queryString);
    return values[key];
  };

  getQueryStringObject = (queryString = window.location.search) => {
    return qs.parse(queryString);
  };

  removeParam = (key, sourceURL = window.location.href) => {
    const url = qs.exclude(sourceURL, [key]);
    window.history.replaceState("", document.title, url);
  };

  getTableQueryParams = (hidePagination, hideSearch) => {
    if (hidePagination && hideSearch) {
      return {};
    }
    const queryObject = this.getQueryStringObject();
    let pageNumber = queryObject.page;
    let rowPerPage = queryObject.rowsPerPage;
    const { searchValue, status, category } = queryObject;
    pageNumber = isNaN(pageNumber) || pageNumber <= 0 ? 1 : pageNumber;
    rowPerPage =
      Number.isNaN(rowPerPage) || !ROW_PER_PAGE_OPTIONS.includes(+rowPerPage)
        ? DEFAULT_ROW_PER_PAGE
        : rowPerPage;

    return {
      ...(!hidePagination && {
        page: +pageNumber,
        rowsPerPage: +rowPerPage,
      }),
      ...(!hideSearch && {
        searchValue,
      }),
      ...(status && {
        status,
      }),
      ...(category && {
        category,
      }),
    };
  };
}

export const urlservice = new UrlServiceClass();
