import { useState } from "react";
import { useDispatch } from "react-redux/";
import Commentmodal from "../commentmodal/Commentmodal";
import { removeComment } from "../../redux/modules/comments";
import { useParams } from "react-router-dom";

const Ment = ({ ment, postId }) => {
  console.log(postId);
  let dispatch = useDispatch();
  let [modal, setModal] = useState(false);
  const close = () => {
    setModal(false);
  };
  return (
    <>
      {modal ? (
        <Commentmodal ment={ment} close={close} postId={postId} />
      ) : null}
      <div className="list" key={ment.postId}>
        <h4>{ment.content}</h4>
        <button
          onClick={() => {
            setModal(true);
          }}
        >
          수정하기
        </button>
        <button
          onClick={() => {
            dispatch(removeComment(ment.id, ment.postId));
          }}
        >
          삭제하기
        </button>
      </div>
    </>
  );
};

export default Ment;
