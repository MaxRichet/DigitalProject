/**
 * @swagger
 * tags:
 *   name: Jobads
 *   description: CRUD to manage job ads
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Jobads:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - searched_profil
 *         - category
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
 *         title:
 *           type: string
 *           description: Title of a job ads
 *         description:
 *           type: string
 *           description: Description of a job ads
 *         searched_profil:
 *           type: string
 *           description: Searched profil
 *         category:
 *           type: string
 *           description: Category of a job ads
 *         why_join_us:
 *           type: string
 *           description: Reasons to join this company
 *         location:
 *           type: string
 *           description: Location of the company
 *         duration:
 *           type: string
 *           description: Duration for this job
 *         salary:
 *           type: string
 *           description: Salary proposed for this job
 *         remote:
 *           type: integer
 *           description: If there's a remote
 *         xp:
 *           type: integer
 *           description: Searched xp for this job
 *         degree:
 *           type: integer
 *           description: Searched degree for this job
 *         user_company_id:
 *           type: integer
 *           description: ID of his user company informations
 */


/**
 * @swagger
 * /jobads:
 *   post:
 *     summary: Create a new job ads
 *     tags: [Jobads]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Jobads'
 *     responses:
 *       201:
 *         description: Votre annonce a bien été mise en ligne.
 *       403:
 *         description: Token manquant.
 *       500:
 *         description: Erreur lors du traitement des données.
 */


/**
 * @swagger
 * /jobads:
 *   get:
 *     summary: Get all informations of a job ads
 *     tags: [Jobads]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Jobads'
 *     responses:
 *       201:
 *         description: Votre compte a bien été créé.
 *       403:
 *         description: Token manquant.
 *       404:
 *         description: Utilisateur non trouvé.
 *       500:
 *         description: Erreur lors du traitement des données.
 */


/**
 * @swagger
 * /jobads:
 *   put:
 *     summary: Modify all informations of a job ads
 *     tags: [Jobads]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Jobads'
 *     responses:
 *       201:
 *         description: Votre annonce a bien été mise à jour.
 *       403:
 *         description: Token manquant.
 *       404:
 *         description: Offre non trouvé.
 *       500:
 *         description: Erreur lors du traitement des données.
 */


/**
 * @swagger
 * /jobads:
 *   delete:
 *     summary: Delete a job ads
 *     tags: [Jobads]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Jobads'
 *     responses:
 *       201:
 *         description: Votre annonce a bien été supprimé.
 *       403:
 *         description: Token manquant.
 *       404:
 *         description: Utilisateur non trouvé.
 *       500:
 *         description: Erreur lors du traitement des données.
 */