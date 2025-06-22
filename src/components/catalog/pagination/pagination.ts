import { createElement } from "../../../utils/dom/createElement";
import "./pagination.css";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export class Pagination {
  private props: PaginationProps;

  constructor(props: PaginationProps) {
    this.props = props;
  }

  render(): HTMLElement {
    const { currentPage, totalPages, totalItems, itemsPerPage } = this.props;

    if (totalPages <= 1) {
      return createElement("div"); // Don't show pagination for single page
    }

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const pagination = createElement("div", { class: "pagination-container" }, [
      // Results info
      createElement("div", { class: "pagination-info" }, [
        `Showing ${startItem}-${endItem} of ${totalItems} products`,
      ]),

      // Pagination controls
      createElement("div", { class: "pagination-controls" }, [
        // Previous button
        this.createButton("Previous", currentPage - 1, currentPage === 1),

        // Page numbers
        createElement("div", { class: "pagination-pages" }, this.createPageNumbers()),

        // Next button
        this.createButton("Next", currentPage + 1, currentPage === totalPages),
      ]),
    ]);

    return pagination;
  }

  private createButton(text: string, targetPage: number, disabled: boolean): HTMLElement {
    const button = createElement(
      "button",
      {
        class: `pagination-btn ${disabled ? "disabled" : ""}`,
        type: "button",
      },
      [text]
    );

    if (!disabled) {
      button.addEventListener("click", () => {
        this.props.onPageChange(targetPage);
      });
    }

    return button;
  }

  private createPageNumbers(): HTMLElement[] {
    const { currentPage, totalPages } = this.props;
    const pages: HTMLElement[] = [];

    // Calculate which pages to show
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    // Adjust range if we're near the beginning or end
    if (endPage - startPage < 4) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + 4);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, endPage - 4);
      }
    }

    // First page + ellipsis if needed
    if (startPage > 1) {
      pages.push(this.createPageButton(1));
      if (startPage > 2) {
        pages.push(createElement("span", { class: "pagination-ellipsis" }, ["..."]));
      }
    }

    // Page numbers in range
    for (let page = startPage; page <= endPage; page++) {
      pages.push(this.createPageButton(page));
    }

    // Ellipsis + last page if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(createElement("span", { class: "pagination-ellipsis" }, ["..."]));
      }
      pages.push(this.createPageButton(totalPages));
    }

    return pages;
  }

  private createPageButton(page: number): HTMLElement {
    const { currentPage } = this.props;
    const isActive = page === currentPage;

    const button = createElement(
      "button",
      {
        class: `pagination-page ${isActive ? "active" : ""}`,
        type: "button",
      },
      [page.toString()]
    );

    if (!isActive) {
      button.addEventListener("click", () => {
        this.props.onPageChange(page);
      });
    }

    return button;
  }
}
