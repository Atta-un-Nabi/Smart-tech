import image from '../../Pics/OIP.png'
function Display() {
    return (
        <>
            <div className="row row-cols-1 row-cols-md-3 g-4" style={{marginTop:'80px'}}>
                <div className="col">
                    <div className="card h-100 border-info">
                        <img src={image} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Component</h5>
                            <p className="card-text">Component  discription <br/>Price<br/>Quantity.</p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card h-100 border-info">
                        <img src={image} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Component</h5>
                            <p className="card-text">Component  discription <br/>Price<br/>Quantity.</p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card h-100 border-info">
                        <img src={image} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Component</h5>
                            <p className="card-text">Component  discription <br/>Price<br/>Quantity.</p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card h-100 border-info">
                        <img src={image} className="card-img-top"  alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Component</h5>
                            <p className="card-text">Component  discription <br/>Price<br/>Quantity.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Display;