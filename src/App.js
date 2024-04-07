import React, { useEffect, useState } from 'react';
import Menu from './Menu';
import Categories from './Categories';
import axios from 'axios';

// const allCategoriesD = ['all', ...new Set(modelData.map((item) => item.category))];
// console.log(allCategoriesD);

function App() {
  const [modelItems, setModelItems] = useState([]);
  const [categoriesD, setCategoriesD] = useState(['all']);
  const [modelOpen, setModelOpen] = useState(false);
  const [selectedModelId, setSelectedModelId] = useState(0);
  const [selectedModel, setSelectedModel] = useState({});
  const [originalModelItems, setOriginalModelItems] = useState([]);

  useEffect(() => {
    axios.get('https://my-json-server.typicode.com/akash12singh/-Hiring-Task-FE-Intern---Marketplace/data')
      .then((response) => {
        const fetchedModelData = response.data;
        setModelItems(fetchedModelData);
        setOriginalModelItems(fetchedModelData); // Set original model items
        // Update categories based on fetched data
        const allCategoriesD = ['all', ...new Set(fetchedModelData.map((item) => item.category))];
        setCategoriesD(allCategoriesD);
      })
      .catch((error) => console.error("Failed to fetch model data:", error));
  }, [])

  const handleModelOpen = (id) => {
    setSelectedModelId(id);
    const newModel = modelItems.find((model) => model.id === id);
    setSelectedModel(newModel);
    setModelOpen(true);
  };

  const filterItems = (category) => {
    if (category === 'all') {
      setModelItems(originalModelItems); // Restore original model items
      return;
    }
    const newItemsD = originalModelItems.filter((item) => item.category === category);
    setModelItems(newItemsD);
  };

  const handleClickOutside = (event) => {
    // Check if the click is outside `.model-section`
    if (!event.target.closest('.model-section')) {
      setSelectedModelId(0); // Reset the selected model ID
      setModelOpen(false); // Close the modal
    }
  };

  return (
    <main>
      <section className="menu section">
        <div className="title">
          <h2>AI Model Explorer</h2>
          <div className="underline"></div>
        </div>
        <Categories categories={categoriesD} filterItems={filterItems} />
        <Menu items={modelItems} handleModelOpen={handleModelOpen} />
        {modelOpen && (
          <div className='modelOpen' onClick={handleClickOutside}>
            <section className="model-section">
              <button className="close-btn" onClick={() => setModelOpen(false)}>X</button>
              <div className="model-content">
                <h2>{selectedModel.name}</h2>
                <p>{selectedModel.description}</p>
                <p><strong>Provider : </strong>{selectedModel.provider}</p>
                <p><strong>Link : </strong><a href={selectedModel.Link} target="_blank" rel="noreferrer">Visit</a></p>
                <p><strong>Use Cases : </strong>
                  <span>
                    {selectedModel.useCases.join(', ')}
                  </span>
                </p>
              </div>
            </section>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;