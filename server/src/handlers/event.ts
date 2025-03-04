import { EventCategory } from "@prisma/client";
import prisma from "../db";
import { Request, Response } from "express";


export const getEvents = async (req: Request, res: Response) => {
  const { 
    page = 1, 
    pageSize = 10, 
    location, 
    date,
    categories 
  } = req.query;

  try {
    const whereConditions: any = {};

    if (location && typeof location === 'object' && 'searchText' in location) {
      const locationObj = location as {
        searchText: string;
        lat: string;
        lng: string;
      };

      if (locationObj.searchText && locationObj.searchText !== '') {
        if (locationObj.lat && locationObj.lng) {
          const lat = Number(locationObj.lat);
          const lng = Number(locationObj.lng);
          const radius = 30; // Default radius in km

          // Calculate the range for latitude and longitude
          whereConditions.latitude = {
            gte: lat - radius / 111.32, // Approximate km-to-lat conversion
            lte: lat + radius / 111.32,
          };
          whereConditions.longitude = {
            gte: lng - radius / (111.32 * Math.cos(lat * (Math.PI / 180))),
            lte: lng + radius / (111.32 * Math.cos(lat * (Math.PI / 180))),
          };
        }
      }
    }

    // Add date filtering if provided
    if (date && date !== 'all') {
      const now = new Date();
      const todayStart = new Date(now.setHours(0, 0, 0, 0));
      const tomorrowStart = new Date(
        todayStart.getTime() + 24 * 60 * 60 * 1000
      );
      const weekendStart = new Date(
        todayStart.getTime() + (5 - todayStart.getDay()) * 24 * 60 * 60 * 1000
      ); // Friday
      const weekendEnd = new Date(
        todayStart.getTime() + (7 - todayStart.getDay()) * 24 * 60 * 60 * 1000
      ); // Sunday

      switch (date) {
        case 'today':
          whereConditions.eventDate = {
            gte: todayStart.toISOString(),
            lt: tomorrowStart.toISOString(),
          };
          break;
        case 'tomorrow':
          whereConditions.eventDate = {
            gte: tomorrowStart.toISOString(),
            lt: new Date(
              tomorrowStart.getTime() + 24 * 60 * 60 * 1000
            ).toISOString(),
          };
          break;
        case 'weekend':
          whereConditions.eventDate = {
            gte: weekendStart.toISOString(),
            lte: weekendEnd.toISOString(),
          };
          break;
      }
    }

    // Add category filtering if categories are provided
    if (categories && Array.isArray(categories) && categories.length > 0) {
      // Ensure all categories are valid EventCategory values
      const validCategories = categories.filter(cat =>
        Object.values(EventCategory).includes(cat as EventCategory)
      );

      if (validCategories.length > 0) {
        whereConditions.category = {
          in: validCategories,
        };
      }
    }

    const events = await prisma.event.findMany({
      where: whereConditions,
      skip: (Number(page) - 1) * Number(pageSize),
      take: Number(pageSize),
      orderBy: {
        eventDate: 'asc',
      },
    });

    const totalEvents = await prisma.event.count({
      where: whereConditions,
    });

    res.json({
      data: events,
      pagination: {
        total: totalEvents,
        page: Number(page),
        pageSize: Number(pageSize),
        totalPages: Math.ceil(totalEvents / Number(pageSize)),
      },
    });

  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Error fetching events' });
  }
};

// Create one
export const createEvent = async (req: Request, res: Response) => {
  try {
    const { 
      name, 
      location, 
      latitude,
      longitude,
      description, 
      link, 
      paid, 
      userImage, 
      userName, 
      eventDate, 
      category, 
    } = req.body;


    const event = await prisma.event.create({
      data: {
        name,
        location,
        latitude,
        longitude,
        description,
        link,
        paid,
        userImage,
        userName,
        eventDate: new Date(eventDate),
        category,
        // @ts-ignore
        userId: req.user.id,
      },
    });

    res.json({ data: event });
  } catch (error) {
    console.error('Event creation failed:', error);
    res.status(500).json({ error: 'Event creation failed' });
  }
};


// Update one event
export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, location, description, link, paid, userImage, userName, eventDate, category } = req.body;

    const event = await prisma.event.findUnique({
      where: {
        id,
      },
    });

    // @ts-ignore
    if (!event || (event.userId !== req.user?.id && req.user?.role !== 'admin')) {
      res.status(404).json({ error: 'Event not found or not authorized' });
      return;
    }

    const updatedEvent = await prisma.event.update({
      where: {
        id,
      },
      data: {
        name,
        location,
        description,
        link,
        paid,
        userImage,
        userName,
        eventDate: new Date(eventDate),
        category,
      },
    });

    res.json({ data: updatedEvent });
  } catch (error) {
    res.status(500).json({ error: 'Event update failed' });
  }
};

// Delete one event
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const event = await prisma.event.findUnique({
      where: {
        id,
      },
    });

    // @ts-ignore
    if (!event || (event.userId !== req.user?.id && req.user?.role !== 'admin')) {
      res.status(404).json({ error: 'Event not found or not authorized' });
      return;
    }

    const deletedEvent = await prisma.event.delete({
      where: {
        id,
      },
    });

    res.json({ data: deletedEvent });
  } catch (error) {
    res.status(500).json({ error: 'Event deletion failed' });
  }
};