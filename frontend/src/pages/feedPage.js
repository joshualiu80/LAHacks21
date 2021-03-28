import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { withCookies, Cookies } from 'react-cookie';
import './feedPage.css';

const FeedPage = (props) => {
  const { cookies } = props;
  const [tags, setTags] = useState([]);
  const [currTab, setCurrTab] = useState(0);
  const [snippetMap, setSnippetMap] = useState(null);
  const [newSnippets, setNewSnippets] = useState([]);

  const renderTags = () => {
    return (
      <div className="tag-row">
        <p className="tag-button" onClick={() => { setCurrTab(0) }}>For You</p>
        {tags.map((tag, index) => {
          return <p className="tag-button" onClick={() => { setCurrTab(index+1) }} >{tag.name}</p>
        })}
      </div>
    );
  };

  const renderFeed = () => {

    const feedSnippets = currTab === 0 ? newSnippets : snippetMap.get(tags[currTab-1]._id);
    
    // if the user wants to see their own personal feed
    if (currTab === 0) {
      return (
        <div>
        <h1 className="feed-title">Your Snippets</h1>
        <div className="snippets-list">
          {
            feedSnippets.length === 0
            ? (<p className="no-snippets-message">No snippets to show :(</p>) :
            (<div>posts</div>)
          }
        </div>
      </div>
      )
    }

    // render the snippets classified under any other tags
    return (
      <div>
        <h1 className="feed-title">{currTab === 0 ? 'Your Snippets' : tags[currTab-1].name}</h1>
        <div className="snippets-list">
          {
            feedSnippets.length === 0
            ? (<p className="no-snippets-message">No snippets to show :(</p>) :
            (<div>posts</div>)
          }
        </div>
      </div>
    );
  };

  useEffect(() => {
    (async () => {
        const userId = cookies.get('userId');

        let allTags = await axios.get(`http://localhost:3000/tags/`);
        console.log('allTags:', allTags);
        allTags = allTags.data;
        console.log('allTags (final):', allTags);
        setTags(allTags);

        let friendSnippets = await axios.get(`http://localhost:3000/snippets/users/${userId}?isSender=false`);
        console.log('friendSnippets:', friendSnippets);
        friendSnippets = friendSnippets.data;
        console.log('friendSnippets (final):', friendSnippets);
        setNewSnippets(friendSnippets);

        const tagMap = new Map();

        let taggedSnippets = await axios.get(`http://localhost:3000/snippets/tagged`);
        console.log('taggedSnippets:', taggedSnippets);
        taggedSnippets.data.map((snippet => {
          let currTagList = tagMap.get(snippet.tag);
          console.log('currTagList', currTagList);
          if (currTagList === undefined) {
            currTagList = [];
          }
          currTagList.push(snippet);
          tagMap.set(snippet.tag, currTagList);
          return snippet;
        }));
        console.log('tagMap:', tagMap);
        setSnippetMap(tagMap);
    })();
  }, []); 

  return (
    <div>
      <div className="navbar-placeholder"></div>
      <div className="tags-section">
        {renderTags()}
      </div>
      <div className="feed-section">
        {renderFeed()}
      </div>
    </div>
  );

}

export default withCookies(FeedPage);