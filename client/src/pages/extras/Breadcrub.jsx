import { ChevronRight } from "lucide-react";
import PropTypes from "prop-types";

const Breadcrumb = ({ items }) => {
  return (
    <nav className="mb-5 flex items-center text-sm text-gray-500 dark:text-gray-400">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {item.href ? (
            <a
              href={item.href}
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              {item.label}
            </a>
          ) : (
            <span className="text-amber-600 dark:text-amber-400 font-medium">
              {item.label}
            </span>
          )}
          {index < items.length - 1 && (
            <ChevronRight size={16} className="mx-2" />
          )}
        </div>
      ))}
    </nav>
  );
};

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
    })
  ).isRequired,
};

export default Breadcrumb;
