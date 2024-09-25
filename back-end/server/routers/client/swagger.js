/**
 * @swagger
 * tags:
 *   name: Client
 *   description: API endpoints for client operations
 */

/**
 * @swagger
 * /api/:
 *   get:
 *     summary: Retrieve a list of halls
 *     tags: [Client]
 *     responses:
 *       200:
 *         description: A list of halls
 *       404:
 *         description: Halls not found
 */

/**
 * @swagger
 * /api/halls/{name}:
 *   get:
 *     summary: Retrieve a specific hall by name
 *     tags: [Client]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: The name of the hall
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Details of the hall
 *       404:
 *         description: Hall not found
 */

/**
 * @swagger
 * /api/dates:
 *   get:
 *     summary: Retrieve a list of event dates
 *     tags: [Client]
 *     responses:
 *       200:
 *         description: A list of dates
 *       404:
 *         description: Dates not found
 */

/**
 * @swagger
 * /api/hallsForDate/{date}:
 *   get:
 *     summary: Retrieve halls available for a specific date
 *     tags: [Client]
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         description: The Hebrew date to check for available halls
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of halls available for the date
 *       404:
 *         description: Halls not found
 */

/**
 * @swagger
 * /api/dates/{idHall}:
 *   get:
 *     summary: Retrieve events for a specific hall
 *     tags: [Client]
 *     parameters:
 *       - in: path
 *         name: idHall
 *         required: true
 *         description: The ID of the hall to check for events
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of events for the hall
 *       404:
 *         description: Events not found
 */

/**
 * @swagger
 * /api/createOrder:
 *   post:
 *     summary: Create a new order
 *     tags: [Client]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               # Add order properties here
 *     responses:
 *       200:
 *         description: Order created successfully
 *       400:
 *         description: Bad request
 */