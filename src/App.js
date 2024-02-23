import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  CircularProgress,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

const API_KEY = "064d4956e01d4680ae906ec1383da580";
const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [readNews, setReadNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(NEWS_API_URL);
        console.log("cek response", response);
        setNews(response.data.articles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleClick = (url) => {
    window.open(url, "_blank");
    setReadNews([...readNews, url]);
  };

  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return new Date(dateString).toLocaleString("en-US", options);
  };

  return (
    <div>
      <h1>News</h1>
      {loading ? (
        <Grid container spacing={2}>
          {[1, 2, 3, 4].map((item) => (
            <Grid key={item} item xs={item % 2 === 0 ? 4 : 8}>
              <Card>
                <CardContent
                  style={{
                    minHeight: "200px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={2}>
          {news.map((item, index) => (
            <Grid key={index} item xs={index % 2 === 0 ? 8 : 4}>
              <Card>
                <CardActionArea onClick={() => handleClick(item.url)}>
                  <CardMedia
                    component="img"
                    height="400"
                    image={item.urlToImage}
                    alt={item.title}
                  />
                  <CardContent style={{ minHeight: "100px" }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <b>Name:</b> {item.source.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <b>Author:</b> {item.author}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <b>Title:</b> {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <b>Description:</b> {item.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      <b>Published:</b> {formatDate(item.publishedAt)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <h2>Read News</h2>
      <ul>
        {readNews.map((url, index) => (
          <li key={index}>
            <img
              src={news.find((item) => item.url === url)?.urlToImage}
              alt="News"
              style={{ width: "100px", marginRight: "10px" }}
            />
            <a href={url} target="_blank" rel="noreferrer">
              {news.find((item) => item.url === url)?.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsPage;
