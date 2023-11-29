import React, { useState } from "react";
import { Btn, BtnArea } from "assets/Theme";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
// import { CommonContext, DetailContext } from "context/CommonContext";

function DetailBtn({
  comment,
  editedContent,
  setEditedContent,
  setCommentsList,
  commentsList,
  id,
}) {
  // const { setCommentsList } = useContext(CommonContext);
  // const { comment, editedContent, setEditedContent } =
  //   useContext(DetailContext);

  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const handleDeleteBtn = async () => {
    const answer = window.confirm("정말로 삭제하시겠습니까?");
    if (!answer) return;

    const newComments = commentsList.filter((comment) => comment.id !== id);
    await axios.delete(`http://localhost:3001/commentData/${id}`);
    console.log(newComments);
    navigate("/");
    setCommentsList(newComments);
  };

  const handleSaveBtn = async () => {
    if (!editedContent) {
      alert("수정사항이 없습니다.");
      return;
    }

    const newComments = commentsList.map((comment) => {
      return comment.id === id
        ? { ...comment, content: editedContent }
        : comment;
    });
    await axios.patch(`http://localhost:3001/commentData/${id}`, {
      ...comment,
      content: editedContent,
    });

    setCommentsList(newComments);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <>
          <Comment>
            <Textarea
              autoFocus
              defaultValue={comment.content}
              onChange={(e) => setEditedContent(e.target.value)}
            ></Textarea>
          </Comment>

          <BtnArea>
            <Btn onClick={() => setIsEditing(false)}>취소</Btn>
            <Btn onClick={handleSaveBtn}>저장</Btn>
          </BtnArea>
        </>
      ) : (
        <>
          <Comment>{comment.content}</Comment>
          <BtnArea>
            <Btn onClick={() => setIsEditing(true)}>수정</Btn>
            <Btn onClick={handleDeleteBtn}>삭제</Btn>
          </BtnArea>
        </>
      )}
    </div>
  );
}

export default DetailBtn;

const Comment = styled.div`
  color: #0b0e1e;
  line-height: 1.5;
  width: 650px;
  height: 230px;
  background-color: #e4e2e2;
  padding: 30px;
  border-radius: 10px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 20px;
  border: none;
  resize: none;
  line-height: 1.5;
`;
