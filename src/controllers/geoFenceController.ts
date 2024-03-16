import { Request, Response } from 'express';
import GeoFence from '../models/geoFenceModel';



// Create a new GeoFence
export const createGeoFence = async (req: Request, res: Response) => {
  const characters = '0123456789abcdef';
  let routeId = '';
  for (let i = 0; i < 16; i++) { // 4 hexadecimal characters to form 16 bits
    routeId += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  console.log()
  try {
    const { name, latitude, longitude, radius, notifyOnEntry, notifyOnExit } = req.body;

    if ( !name || !latitude || !longitude || !radius || !notifyOnEntry || !notifyOnExit ){
      return res.status(400).send('Missing fields');
    }

    const geoFenceName = await GeoFence.findOne({ where: { name }})
    if (geoFenceName ){
      return res.status(401).send({ error: "Duplicate name"})
    }

    const newGeoFence = await GeoFence.create({
      name,
      latitude,
      longitude,
      radius,
      notifyOnEntry,
      notifyOnExit,
      routeId
    });
    return res.json(newGeoFence);
  } catch (error) {

    console.error('Error updating GeoFence:', error);
    return res.status(500).send('Error updating GeoFence');

    // const errorMessage = error instanceof Error ? error.message.split('\n')[0] : 'Internal server error';
    // console.error("Error message:", errorMessage);
    // return res.json({ error: errorMessage })
  }
}

// Update an existing GeoFence
export const updateGeoFence = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Assuming id is passed as a URL parameter
    const updateData = req.body;
    const [numberOfAffectedRows, [updatedGeoFence]] = await GeoFence.update(updateData, {
      where: { id },
      returning: true, // This option is specific to PostgreSQL
    });

    if (numberOfAffectedRows > 0) {
      return res.json(updatedGeoFence);
    } else {
      return res.status(404).send('GeoFence not found');
    }
  } catch (error) {
    console.error('Error updating GeoFence:', error);
    return res.status(500).send('Error updating GeoFence');
  }
}

// Delete a GeoFence
export const deleteGeoFence = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await GeoFence.destroy({
      where: { id }
    });

    if (deleted) {
      return res.send('GeoFence deleted');
    } else {
      return res.status(404).send('GeoFence not found');
    }
  } catch (error) {
    console.error('Error deleting GeoFence:', error);
    return res.status(500).send('Error deleting GeoFence');
  }
}

// Get a specific GeoFence by ID
export const getGeoFenceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const geoFence = await GeoFence.findByPk(id);

    if (geoFence) {
      return res.json(geoFence);
    } else {
      return res.status(404).send('GeoFence not found');
    }
  } catch (error) {
    console.error('Error fetching GeoFence:', error);
    return res.status(500).send('Error fetching GeoFence');
  }
}

// List all GeoFences
export const listGeoFences = async (req: Request, res: Response) => {
  try {
    const geoFences = await GeoFence.findAll();
    return res.json(geoFences);
  } catch (error) {
    console.error('Error listing GeoFences:', error);
    return res.status(500).send('Error listing GeoFences');
  }
}



//  listening to geofencing


// listening for changes in the actively-monitored set of geofencing


// removing a single geofencing 

// remove all geofencing


// querying geofecing


// monitoring only 