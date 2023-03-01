import React, { useState, useEffect } from "react";
import { Stack, Note, List, ListItem } from "@contentful/f36-components";
import { Multiselect } from "@contentful/f36-multiselect";
import { /* useCMA, */ useSDK } from "@contentful/react-apps-toolkit";

// TARGET THE FIELD IN WHICH YOU WANT YOUR APP TO APPEAR
const CONTENT_FIELD_ID = "segments";

const Field = () => {
  const sdk = useSDK();

  const contentField = sdk.entry.fields[CONTENT_FIELD_ID];

  const spaces = [
    "Travel Blog",
    "Finnace Blog",
    "Fitness App",
    "News Website",
    "eCommerce Catalogue",
    "Photo Gallery",
  ];

  const [selectedSpaces, setSelectedSpaces] = useState([]); // Empty array to hold the selected items
  // const [ filteredItems, setFilteredItems ] = useState(spaces);

  const handleSelectItem = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setSelectedSpaces((prevState) => [...prevState, value]);
    } else {
      const newSelectedSpaces = selectedSpaces.filter(
        (space) => space !== value,
      );
      setSelectedSpaces(newSelectedSpaces);
    }
  };

  useEffect(() => {
    const detach = contentField.onValueChanged((value) => {
      setSelectedSpaces(value);
    });
    return () => detach();
  }, [contentField]);

  return (
    <Stack flexDirection="column" spacing="spacingS">
      <Multiselect currentSelection={selectedSpaces}>
        {spaces.map((space) => {
          const val = space.toLowerCase().replace(/\s/g, "-");
          return (
            <Multiselect.Option
              key={`key-${val}`}
              itemId={`space-${val}`}
              value={space}
              label={space}
              onSelectItem={handleSelectItem}
              // isChecked={selectedSpaces.includes(space)}
            />
          );
        })}
        ;
      </Multiselect>
      <Note style={{ marginBottom: "12px" }}>
        <List style={{ marginTop: "12px" }}>
          <ListItem>{selectedSpaces}</ListItem>
        </List>
      </Note>
    </Stack>
  );
};

export default Field;
