import Create from '../components/create';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { withCookies, Cookies } from 'react-cookie';
import AudioPlayer from '../components/AudioPlayer';
import './feedPage.css';
import Navbar from '../components/Navbar';
const exampleIMG = "https://images.ctfassets.net/hrltx12pl8hq/6YSoTmOYPk2VtQ7JSkPuzS/8250a3d54c1a714aa5e57f6a2826509e/shutterstock_1554086789.jpg?fit=fill&w=480&h=270";

const FeedPage = (props) => {
  const { cookies } = props;
  const [tags, setTags] = useState([]);
  const [newSnippets, setNewSnippets] = useState([]);
  const [snippetMap, setSnippetMap] = useState(null);
  const [currTab, setCurrTab] = useState(0);

  const renderTags = () => {
    return (
      <div className="tag-row">
        <p
          className={`tag-button ${currTab === 0 ? 'selected' : ''}`}
          onClick={() => { setCurrTab(0) }}
        >
          For You
        </p>
        {
          tags.map((tag, index) => {
            return <p
              className={`tag-button ${currTab-1 === index ? 'selected' : ''}`}
              onClick={() => { setCurrTab(index+1) }}
              style={{'backgroundColor': {}}}
            >{tag.name}</p>
          })
        }
      </div>
    );
  };

  const renderFeed = () => {

    const feedSnippets = currTab === 0 ? newSnippets : snippetMap.get(tags[currTab-1]._id);
    
    // if the user wants to see their own personal feed
    
    return (
      <div>
        <h1 className="feed-title">{currTab === 0 ? 'Your Snippets' : tags[currTab-1].name}</h1>
        <div className="snippets-list">
          {
            feedSnippets === undefined || feedSnippets.length === 0
            ? (<p className="no-snippets-message">No snippets to show :(</p>) :
            (<div>
              {
                feedSnippets.map((snippet) => {
                  return (
                    <div className="snippet-card">
                      <div className="snippet-card-left-div">
                        <div className="bubble">
                          <img className="snippet-image" src={exampleIMG}/>
                        </div>
                        <p className="snippet-name">{snippet.title}</p>
                      </div>
                      <AudioPlayer audio={snippet.fileName} />
                    </div>
                  );
                })
              }
            </div>)
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
    <div className="outermost">
      <Navbar/>
      <div className="feed-page-container">
        <div className="feed-page-left-side">
          <div className="tags-section">
            {renderTags()}
          </div>
          <div className="feed-section">
            {renderFeed()}
          </div>
        </div>
        <div className="feed-page-right-sidebar">
          <p className="create-recording-button">Create Recording</p>
        </div>
      </div>
    </div>
  );

}

export default withCookies(FeedPage);
