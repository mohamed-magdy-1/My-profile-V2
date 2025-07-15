import React, { memo, useState } from "react";
import './HexGrid.css'
import Image from "next/image";
const HexGrid = memo((data) => {
  return (
    <div className="hex-grid-container">
      {data.data.map((item) => (
        <div key={item.id} className="hex">
                      {item?.url && (
                          <Image
                              className="img-s-icon"
                              src={item.url}
                              alt="img-s-icon"
                              width={400}
                              height={300}
                              loading="lazy"
                          />
                      )}
        </div>
      ))}
    </div>
  );
});

export default HexGrid;
