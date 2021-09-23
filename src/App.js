// this is more voice control than AI, but whatever...

import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import wordsToNumbers from 'words-to-numbers';
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles.js'

// keys should be in .env file
const alanKey = '1adc1da911479573a37317f834ae6d552e956eca572e1d8b807a3e2338fdd0dc/stage'
// const newsApiKey = '478fe77828c9461c82f48f6b8d2a69e7'

const App = () => {
    const [newsArticles, setNewsArticles] = useState([])
    const [activeArticle, setActiveArticle] = useState(-1)

    const classes = useStyles()

    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles, number }) => {
                if(command === 'newHeadlines') {
                    setNewsArticles(articles)
                    setActiveArticle(-1)
                } else if (command === 'highlight') {
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1)
                } else if(command === 'open') {
                    const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
                    const article = articles[parsedNumber - 1];
          
                    if (parsedNumber > articles.length) {
                      alanBtn().playText('Please try that again...');
                    } else if (article) {
                      window.open(article.url, '_blank');
                      alanBtn().playText('Opening...');
                    } else {
                      alanBtn().playText('Please try that again...');
                    }
                }
            }
        })
    }, [])

    return(
        <div>
            <div className={classes.logoContainer}>
                {/* TODO: image appears as broken */}
                {/* <img src="../assets/alan-ai-logo.png" className={classes.alanLogo} alt="alan logo"/> */}
                <h1>Alan AI Voice Control Demo</h1>
            </div>
            <NewsCards articles={ newsArticles } activeArticle={ activeArticle }/>
        </div>
    )
}

export default App;