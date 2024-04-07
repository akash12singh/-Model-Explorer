import React from 'react';


const Menu = ({ items, handleModelOpen }) => {
  return (
    <div className='section-center'>
      {items.map((menuItem) => {
        const { id, name, provider, description } = menuItem;
        return (
          <article key={id}>
            <div class="basic-card basic-card-dark">
              <div class="card-content">
                <span class="card-title">{name}</span>
                <p class="card-text">
                  {description}
                </p>
              </div>

              <div class="card-link">
                <span className='checkout-btn' onClick={()=>handleModelOpen(id)}>Checkout</span>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default Menu;
