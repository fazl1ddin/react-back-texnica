function PrevNext({ type, disabled }) {
  return (
    <button disabled={disabled} className="disabled:text-black/25 disabled:cursor-not-allowed">
      {type === "prev" ? "Previous" : "Next"}
    </button>
  );
}

export default PrevNext;
