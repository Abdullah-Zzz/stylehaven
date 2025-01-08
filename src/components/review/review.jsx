import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Card, CardContent, Rating } from '@mui/material';

function ReviewSection() {
  const [reviews, setReviews] = useState([
    { name: 'John Doe', comment: 'Great product!', rating: 4 },
    { name: 'Jane Smith', comment: 'Loved it! Will buy again.', rating: 5 },
  ]);
  const [newReview, setNewReview] = useState({ name: '', comment: '', rating: 0 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleRatingChange = (e, value) => {
    setNewReview({ ...newReview, rating: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newReview.name && newReview.comment && newReview.rating > 0) {
      setReviews([...reviews, newReview]);
      setNewReview({ name: '', comment: '', rating: 0 });
    } else {
      alert('Please fill in all fields and provide a rating.');
    }
  };

  return (
    <Box sx={{ margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom align="left">
        Reviews
      </Typography>

      {/* Display Existing Reviews */}
      {reviews.map((review, index) => (
        <Card key={index} sx={{ marginBottom: 2 }}>
          <CardContent sx={{ textAlign: 'left' }}>
            <Typography variant="h6">{review.name}</Typography>
            <Rating value={review.rating} readOnly />
            <Typography variant="body1">{review.comment}</Typography>
          </CardContent>
        </Card>
      ))}

      {/* Add a New Review */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          marginTop: 4,
          padding: 2,
          border: '1px solid #ddd',
          borderRadius: '8px',
          textAlign: 'left', // Align the form content to the left
        }}
      >
        <Typography variant="h5">Add a Review</Typography>
        <TextField
          label="Name"
          name="name"
          value={newReview.name}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Comment"
          name="comment"
          value={newReview.comment}
          onChange={handleChange}
          multiline
          rows={3}
          fullWidth
          required
        />
        <Box>
          <Typography component="legend">Rating</Typography>
          <Rating
            name="rating"
            value={newReview.rating}
            onChange={handleRatingChange}
            precision={0.5}
          />
        </Box>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit Review
        </Button>
      </Box>
    </Box>
  );
}

export default ReviewSection;
