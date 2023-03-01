import React, { useState, useEffect } from "react";
import { Note, List, ListItem } from "@contentful/f36-components";
import { /* useCMA, */ useSDK } from "@contentful/react-apps-toolkit";

const CONTENT_FIELD_ID = 'body'; // This is the name that we set to the blog post
// we have a 'title' and 'body'
const WORDS_PER_MINUTE = 200;

const Sidebar = () => {
  const sdk = useSDK();

  const contentField = sdk.entry.fields[CONTENT_FIELD_ID];

  const [blogText, setBlogText] = useState(contentField.getValue());

  useEffect(() => {
    const detach = contentField.onValueChanged((value) => {
      setBlogText(value);
    });
    return () => detach();
  }, [contentField]);

  const readingTime = (text) => {
    const wordCount = text.split(" ").length;
    const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);
    return {
      words: wordCount,
      text: `${minutes} min read`,
    };
  };

  const stats = readingTime(blogText || "");

  return (
    <>
      <Note style={{ marginBottom: "12px" }}>
        Metrics for your blog post:
        <List style={{ marginTop: "12px" }}>
          <ListItem>Word Count: {stats.words}</ListItem>
          <ListItem>Reading time: {stats.text}</ListItem>
        </List>
      </Note>
    </>
  );
};

export default Sidebar;
