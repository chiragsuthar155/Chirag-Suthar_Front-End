import React, { useState, useEffect, memo } from "react";
import PropTypes from "prop-types";

// Single List Item
const WrappedSingleListItem = ({ index, isSelected, onClickHandler, text }) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? "green" : "red" }}
      onClick={() => onClickHandler(index)}
    >
      {text}
    </li>
  );
};

WrappedSingleListItem.propTypes = {
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const SingleListItem = memo(WrappedSingleListItem);

// List Component
const WrappedListComponent = ({ items }) => {
  // Not need to set initially useState to null useEffect is setting it to null;
  const [selectedIndex, setSelectedIndex] = useState();
  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = (index) => {
    // console.log(index);
    setSelectedIndex(index);
  };

  return (
    <ul style={{ textAlign: "left" }}>
      {items &&
        items.map((item, index) => (
          <SingleListItem
            key={index}
            onClickHandler={() => handleClick(index)}
            text={item.text}
            index={index}
            isSelected={selectedIndex === index}
          />
        ))}
    </ul>
  );
};

WrappedListComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ),
};

// Providing Dummy Data in items array to represent it to the screen.

WrappedListComponent.defaultProps = {
  items: [
    {
      text: "React is a free and open-source front-end JavaScript library for building user interfaces based on components. It is maintained by Meta and a community of individual developers and companies",
    },
    {
      text: "React primitives render to native platform UI, meaning your app uses the same native platform APIs other apps do.",
    },
    {
      text: "React Native combines the best parts of native development with React, a best-in-class JavaScript library for building user interfaces.",
    },
    {
      text: "React Native lets you create truly native apps and doesn't compromise your users' experiences. It provides a core set of platform agnostic native components like View, Text, and Image that map directly to the platform's native UI building blocks.",
    },
  ],
};

const List = memo(WrappedListComponent);

function App() {
  return (
    <div className="App">
      <WrappedListComponent />
    </div>
  );
}

export default App;
