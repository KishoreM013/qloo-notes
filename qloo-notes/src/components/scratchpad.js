import React, { useRef, useState, useEffect } from "react";

export function ScratchPad() {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 800, height: 500 });
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [minimized, setMinimized] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [tool, setTool] = useState("pencil"); // 'pencil' or 'eraser'

  const canvasRef = useRef(null);
  const resizeRef = useRef(null);

  // Drawing helpers
  const getCoords = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    } else {
      return {
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
      };
    }
  };
  const handleStart = (e) => {
    e.preventDefault();
    const ctx = canvasRef.current.getContext("2d");
    ctx.globalCompositeOperation = tool === "eraser" ? "destination-out" : "source-over";
    ctx.strokeStyle = tool === "pencil" ? "#1565c0" : "rgba(0,0,0,1)";
    ctx.lineWidth = tool === "eraser" ? 28 : 3.2;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    const { x, y } = getCoords(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setDrawing(true);
  };
  const handleMove = (e) => {
    if (!drawing) return;
    e.preventDefault();
    const ctx = canvasRef.current.getContext("2d");
    ctx.globalCompositeOperation = tool === "eraser" ? "destination-out" : "source-over";
    ctx.strokeStyle = tool === "pencil" ? "#1565c0" : "rgba(0,0,0,1)";
    ctx.lineWidth = tool === "eraser" ? 28 : 3.2;
    const { x, y } = getCoords(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };
  const handleEnd = () => {
    setDrawing(false);
    const ctx = canvasRef.current.getContext("2d");
    ctx.closePath();
    ctx.globalCompositeOperation = "source-over";
  };

  // Canvas reset + save
  const handleReset = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  const handleSave = () => {
    const url = canvasRef.current.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "scratchpad.png";
    a.click();
  };

  // Drag-to-move handlers
  const handleDragStart = (e) => {
    e.preventDefault();
    setDragging(true);
    const pageX = e.type === "touchstart" ? e.touches[0].pageX : e.pageX;
    const pageY = e.type === "touchstart" ? e.touches[0].pageY : e.pageY;
    setDragStart({ x: pageX - position.x, y: pageY - position.y });
  };
  const handleDrag = (e) => {
    if (!dragging) return;
    e.preventDefault();
    const pageX = e.type === "touchmove" ? e.touches[0].pageX : e.pageX;
    const pageY = e.type === "touchmove" ? e.touches[0].pageY : e.pageY;
    setPosition({
      x: pageX - dragStart.x,
      y: pageY - dragStart.y,
    });
  };
  const handleDragEnd = () => setDragging(false);

  // Resize handlers
  const handleResizeStart = (e) => {
    e.preventDefault();
    setResizing(true);
    resizeRef.current = {
      startX: e.type === "touchstart" ? e.touches[0].clientX : e.clientX,
      startY: e.type === "touchstart" ? e.touches[0].clientY : e.clientY,
      startWidth: size.width,
      startHeight: size.height,
    };
  };
  const handleResize = (e) => {
    if (!resizing) return;
    let clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
    let clientY = e.type === "touchmove" ? e.touches[0].clientY : e.clientY;
    const deltaX = clientX - resizeRef.current.startX;
    const deltaY = clientY - resizeRef.current.startY;
    setSize({
      width: Math.max(340, resizeRef.current.startWidth + deltaX),
      height: Math.max(180, resizeRef.current.startHeight + deltaY),
    });
  };
  const handleResizeEnd = () => setResizing(false);

  // Attach/detach drag/resize
  useEffect(() => {
    if (dragging || resizing) {
      const move = dragging ? handleDrag : handleResize;
      const up = dragging ? handleDragEnd : handleResizeEnd;
      window.addEventListener("mousemove", move);
      window.addEventListener("touchmove", move, { passive: false });
      window.addEventListener("mouseup", up);
      window.addEventListener("touchend", up);
      return () => {
        window.removeEventListener("mousemove", move);
        window.removeEventListener("touchmove", move);
        window.removeEventListener("mouseup", up);
        window.removeEventListener("touchend", up);
      };
    }
  });

  // Styles
  const styles = {
    pad: {
      position: "fixed",
      top: position.y,
      left: position.x,
      zIndex: 9999,
      width: size.width + 20,
      minWidth: 340,
      minHeight: 180,
      background: "linear-gradient(120deg,#f5fafc,#e6f1fb 55%,#ececff 100%)",
      border: "4px solid #1976d2",
      borderRadius: 14,
      boxShadow: "0 8px 38px rgba(23,70,162,0.14)",
      userSelect: dragging ? "none" : "auto",
      padding: 10,
      maxWidth: "95vw",
      maxHeight: "95vh",
      boxSizing: "content-box",
      transition: "box-shadow 0.15s"
    },
    header: {
      width: "97%",
      background: "linear-gradient(120deg,#1976d2,#1565c0 80%)",
      color: "#fff",
      padding: "9px 14px",
      cursor: "move",
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      fontWeight: 500,
      fontSize: 18,
      letterSpacing: 0.7,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "0 2px 10px rgba(25,118,210,0.07)",
    },
    controls: {
      display: "flex",
      gap: "0.6rem",
      alignItems: "center"
    },
    toolBar: {
      display: "flex",
      gap: "8px",
      margin: "6px 0 12px 0"
    },
    toolBtn: (active) => ({
      background: active ? "linear-gradient(90deg,#1976d2 88%,#42a5f5)" : "#fff",
      color: active ? "#fff" : "#1976d2",
      border: active ? "2px solid #1565c0" : "1.5px solid #b0bec5",
      borderRadius: 7,
      padding: "5px 18px 4px 18px",
      fontWeight: 600,
      fontSize: 16,
      cursor: "pointer",
      boxShadow: active ? "0 2px 7px #90caf9" : "none",
      outline: "none",
      transition: "all 0.12s",
      display: "flex",
      alignItems: "center",
      gap: 5
    }),
    actionBtn: {
      background: "#fff",
      color: "#1976d2",
      border: "1.5px solid #1976d2",
      borderRadius: 7,
      padding: "4px 16px",
      fontWeight: 500,
      fontSize: 15,
      marginLeft: 4,
      cursor: "pointer",
      height: "32px",
      outline: "none",
      transition: "background 0.13s"
    },
    body: {
      display: minimized ? "none" : "block",
      padding: 10
    },
    canvas: {
      width: size.width,
      height: size.height,
      background: "#fff",
      border: "2px solid #90caf9",
      borderRadius: 7,
      display: "block",
      touchAction: "none",
      boxShadow: "0 2px 12px rgba(33,150,243,0.08)"
    },
    resizeHandle: {
      position: "absolute",
      right: 22,
      bottom: 14,
      width: 20,
      height: 20,
      borderRadius: 4,
      background:
        "linear-gradient(135deg,#90caf9 25%,#1976d2 90%)",
      boxShadow: "0 1px 2px #b3d7ff",
      border: "2.5px solid #fff",
      cursor: "nwse-resize",
      zIndex: 12,
      display: minimized ? "none" : "block",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "flex-end",
      fontSize: 20
    },
    grip: {
      color: "#fff",
      fontWeight: 700,
      fontSize: 14,
      opacity: 0.75,
      margin: 0,
      lineHeight: 1,
      userSelect: "none"
    },
    minimizedText: {
      color: "#888",
      padding: 24,
      textAlign: "center",
      fontStyle: "italic",
      fontSize: 17,
      letterSpacing: 1.1
    }
  };

  return (
    <div style={styles.pad}>
      <div
        style={styles.header}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        <span>
          <span style={{ marginRight: 7, fontWeight: 700, fontSize: 20, verticalAlign: "middle" }}>🗒️</span>
          Scratch Pad
        </span>
        <span style={styles.controls}>
          <button
            title={minimized ? "Restore Pad" : "Minimize Pad"}
            onClick={() => setMinimized((v) => !v)}
            style={styles.actionBtn}
          >
            {minimized ? "⛶" : "–"}
          </button>
          <button onClick={handleReset} disabled={minimized} style={styles.actionBtn} title="Clear Pad">
            ♻️ Reset
          </button>
          <button onClick={handleSave} disabled={minimized} style={styles.actionBtn} title="Download as PNG">
            💾 Save
          </button>
        </span>
      </div>
      {minimized ? (
        <div style={styles.minimizedText}>Scratch Pad Minimized</div>
      ) : (
        <div style={styles.body}>
          <div style={styles.toolBar}>
            <button
              style={styles.toolBtn(tool === "pencil")}
              onClick={() => setTool("pencil")}
              disabled={tool === "pencil"}
              title="Draw"
            >
              <span style={{ fontSize: 19, marginRight: 3 }}>✏️</span>
              Pencil
            </button>
            <button
              style={styles.toolBtn(tool === "eraser")}
              onClick={() => setTool("eraser")}
              disabled={tool === "eraser"}
              title="Erase"
            >
              <span style={{ fontSize: 19, marginRight: 3 }}>🧽</span>
              Eraser
            </button>
          </div>
          <div style={{ position: "relative" }}>
            <canvas
              ref={canvasRef}
              width={size.width}
              height={size.height}
              style={styles.canvas}
              onMouseDown={handleStart}
              onMouseMove={handleMove}
              onMouseUp={handleEnd}
              onMouseLeave={handleEnd}
              onTouchStart={handleStart}
              onTouchMove={handleMove}
              onTouchEnd={handleEnd}
            />
            <div
              style={styles.resizeHandle}
              onMouseDown={handleResizeStart}
              onTouchStart={handleResizeStart}
              title="Resize Pad"
            >
              <div style={styles.grip}>↘️</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
