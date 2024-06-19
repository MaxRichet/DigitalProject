/**
 * @swagger
 * tags:
 *   name: Userapp
 *   description: CRUD to manage user application
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Userapp:
 *       type: object
 *       required:
 *         - cv
 *         - portfolio
 *       properties:
 *         id:
 *           type: integer
 *           description: ID user
 *         created:
 *           type: datetime
 *           description: Date of creation
 *         modified:
 *           type: datetime
 *           description: Date of update
 *         cv:
 *           type: string
 *           description: CV of user
 *         portfolio:
 *           type: string
 *           description: Portfolio of user
 *         user_student_id:
 *           type: string
 *           description: User id 
 *         job_ad_id:
 *           type: string
 *           description: Job ad id
 */


/**
 * @swagger
 * /jobads:
 *   post:
 *     summary: Create a new user application
 *     tags: [Userapp]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Userapp'
 *     responses:
 *       201:
 *         description: Candidature envoyé avec succès.
 *       403:
 *         description: Token manquant.
 *       500:
 *         description: Erreur lors du traitement des données.
 */