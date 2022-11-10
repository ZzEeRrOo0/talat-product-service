export class PaginationResponse {
	totalItem: number;
	currentPage: number;
	pageSize: number;
	totalPage: number;
	startPage: number;
	endPage: number;
	startIndex: number;
	endIndex: number;
	pages: Array<number>;

	constructor(
		$totalItem: number,
		$currentPage: number,
		$pageSize: number,
		$totalPage: number,
		$startPage: number,
		$endPage: number,
		$startIndex: number,
		$endIndex: number,
		$pages: Array<number>
	) {
		this.totalItem = $totalItem;
		this.currentPage = $currentPage;
		this.pageSize = $pageSize;
		this.totalPage = $totalPage;
		this.startPage = $startPage;
		this.endPage = $endPage;
		this.startIndex = $startIndex;
		this.endIndex = $endIndex;
		this.pages = $pages;
	}
}

export class Pagination {
	paginate(
		totalItems: number,
		currentPage: number = 1,
		pageSize: number = 10,
		maxPages: number = 10
	): PaginationResponse {
		// calculate total pages
		let totalPages = Math.ceil(totalItems / pageSize);

		// ensure current page isn't out of range
		if (currentPage < 1) {
			currentPage = 1;
		} else if (currentPage > totalPages) {
			currentPage = totalPages;
		}

		let startPage: number, endPage: number;
		if (totalPages <= maxPages) {
			// total pages less than max so show all pages
			startPage = 1;
			endPage = totalPages;
		} else {
			// total pages more than max so calculate start and end pages
			let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
			let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
			if (currentPage <= maxPagesBeforeCurrentPage) {
				// current page near the start
				startPage = 1;
				endPage = maxPages;
			} else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
				// current page near the end
				startPage = totalPages - maxPages + 1;
				endPage = totalPages;
			} else {
				// current page somewhere in the middle
				startPage = currentPage - maxPagesBeforeCurrentPage;
				endPage = currentPage + maxPagesAfterCurrentPage;
			}
		}

		// calculate start and end item indexes
		let startIndex = (currentPage - 1) * pageSize;
		let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

		// create an array of pages to ng-repeat in the pager control
		let pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
			(i) => startPage + i
		);

		return new PaginationResponse(
			totalItems,
			currentPage,
			pageSize,
			totalPages,
			startPage,
			endPage,
			startIndex,
			endIndex,
			pages
		);
	}
}
