import React from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getReviews } from "../api";

const ReviewSection = styled.div<{ $isReview: boolean }>`
  width: 100%;
  overflow: hidden;
  transition: all 0.5s;
  ${({ $isReview }) =>
    $isReview ? "height:fit-content; opacity:1;" : "height:0; opacity:0"};
`;

const ReviewList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const ReviewTitle = styled.span`
  display: inline-block;
  padding: 6px;
  margin-bottom: 10px;
  border-radius: 5px;
  background: #fff;
  font-weight: bold;
  color: ${({ theme }) => theme.black.darker};
`;

interface ReviewContents {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating: number;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

const Review = ({
  movieId,
  isReview,
}: {
  movieId: number;
  isReview: boolean;
}) => {
  const { data: reviewData, isLoading: reviewLoading } = useQuery({
    queryKey: ["getReviews", movieId],
    queryFn: () => getReviews(movieId!),
    enabled: !!movieId, // movieId가 존재할 때만 쿼리 실행
  });

  return (
    <ReviewSection $isReview={isReview}>
      {reviewLoading ? (
        <div>Loading Reviews...</div>
      ) : (
        <ReviewList>
          {reviewData?.results.length > 0 ? (
            reviewData.results.map((review: ReviewContents) => (
              <li key={review.id}>
                <ReviewTitle>{review.author}</ReviewTitle>
                <div>{review.content}</div>
              </li>
            ))
          ) : (
            <li>등록된 리뷰가 없습니다</li>
          )}
        </ReviewList>
      )}
    </ReviewSection>
  );
};

export default React.memo(Review);
