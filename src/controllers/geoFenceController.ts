import { Request, Response } from 'express';
import GeoFence from '../models/geoFenceModel';



  // Create a new GeoFence
  export const createGeoFence = async (req: Request, res: Response) => {
    try {
      const { name, latitude, longitude, location, radius, notifyOnEntry, notifyOnExit, tags, routeId, vehicleId, type } = req.body;
      const newGeoFence = await GeoFence.create({
        name,
        latitude,
        longitude,
        location,
        radius,
        notifyOnEntry,
        notifyOnExit,
        tags,
        routeId,
        vehicleId,
        type
      });
      return res.json(newGeoFence);
    } catch (error) {
      console.error('Error creating GeoFence:', error);
      return res.status(500).send('Error creating GeoFence');
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