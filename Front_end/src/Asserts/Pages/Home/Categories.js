import './Category.css';
import image3 from '../../Pics/cpu.jpg';
import image4 from '../../Pics/wall1.jpg';
import image5 from '../../Pics/wall2.jpg';
import image6 from '../../Pics/wall3.jpg';
import image7 from '../../Pics/wall4.jpg';

const categories = [
  {
    image: image3,
    title: 'Advance Electronics',
    description: 'All necessary computer components can be found here',
  },
  {
    image: image4,
    title: 'Tools make life easier',
    description: 'Best quality tools for all students and workers.',
  },
  {
    image: image5,
    title: 'Entertainment',
    description: 'Best quality entertainment electronics make you happy.',
  },
  {
    image: image6,
    title: 'Computers and its parts',
    description: 'All necessary computer components can be found here',
  },
  {
    image: image7,
    title: 'Computers and its parts',
    description: 'All necessary computer components can be found here',
  },
];

function Categories() {
  return (
    <div style={{ backgroundColor: '#032F40', marginBottom: '0px' }}>
      <div id="carouselExampleDark" className="carousel carousel slide custom-carousel" >
        <div className="carousel-indicators" >
          {categories.map((category, index) => (
            <button key={index} type="button" data-bs-target="#carouselExampleDark"
              data-bs-slide-to={index} className={index === 0 ? 'active' : ''}
              aria-current={index === 0} aria-label={`Slide ${index + 1}`}>
            </button>
          ))}
        </div>

        <div className="carousel-inner">
          {categories.map((category, index) => (
            <div key={index} autoFocus className={`carousel-item ${index === 0 ? 'active' : ''}`} data-bs-interval="2000">
              <div className="card text-bg-dark">
                <img src={category.image} className="card-img" width={'40%'} height={'20%'} alt="..." />
                <div className="card-img-overlay"></div>
              </div>

              <div className="carousel-caption d-none d-md-block">
                <h5 className='text-hover'>{category.title}</h5>
                <p>{category.description}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Categories;
