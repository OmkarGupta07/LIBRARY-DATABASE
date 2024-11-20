const libraryService = require('../Service/Libraries'); 

async function getAllLibraries(req, res) {
  try {
    const libraries = await libraryService.getAllLibraries();
    res.status(200).json(libraries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getLibraryById(req, res) {
  const { id } = req.params;
  try {
    const library = await libraryService.getLibraryById(id);
    if (!library) {
      return res.status(404).json({ message: 'Library not found' });
    }
    res.status(200).json({data:library});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createLibrary(req, res) {
  try {

    const {location,name} =req.body;
    const newLibrary = await libraryService.createLibrary({name,location});
    newLibrary?.code ===11000 ? res.status(400).json({message:'CANNOT CREATE DUPLICATE LIBRARY'})
                             : res.status(201).json({message:'LIBRARY IS CREATED'});

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateLibrary(req, res) {
  const { id } = req.params;
  try {
    const updatedLibrary = await libraryService.updateLibrary(id, req.body);
    if (!updatedLibrary.matchedCount) {
      return res.status(404).json({ message: 'Library not found' });
    }
    res.status(200).json({ message: 'Library updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteLibrary(req, res) {
  const { id } = req.params;
  try {
    const deletedLibrary = await libraryService.deleteLibrary(id);
    if (!deletedLibrary.deletedCount) {
      return res.status(404).json({ message: 'Library not found' });
    }
    res.status(200).json({ message: 'Library deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllLibraries,
  getLibraryById,
  createLibrary,
  updateLibrary,
  deleteLibrary,
};
