export default function Background({ type, src, brightness = 1, children }) {
  return (
    <div className="bgRoot">
      {type === "video" && (
        <video
          className="bgVideo"
          src={src}
          autoPlay
          muted
          loop
          playsInline
          style={{ filter: `brightness(${brightness})` }}
        />
      )}
      <div className="bgContent">{children}</div>
    </div>
  );
}
