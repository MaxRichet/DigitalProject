/**
 * @swagger
 * tags:
 *   name: User
 *   description: CRUD to manage user
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstname
 *         - lastname
 *         - email
 *         - password
 *         - phone
 *         - role
 *         - gender
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
 *         firstname:
 *           type: string
 *           description: User firstname
 *         lastname:
 *           type: string
 *           description: User lastname
 *         email:
 *           type: string
 *           description: User email
 *         password:
 *           type: string
 *           description: User password
 *         post:
 *           type: string
 *           description: If it's a company account it's his job in his company
 *         phone:
 *           type: string
 *           description: User phone number
 *         role:
 *           type: string
 *           description: To find out is it's an admin, a student or a company
 *         gender:
 *           type: string
 *           description: User gender
 *         company_id:
 *           type: integer
 *           description: ID of his company
 *         student_id:
 *           type: integer
 *           description: ID of his student's informations
 */


/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Create a new user account
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Votre compte a bien été créé.
 *       401:
 *         description: Un compte est déjà lié à cet email.
 *       409:
 *         description: L'email n'a pas le bon format. 
 *
 *       500:
 *         description: Une erreur est survenue lors de la création de votre compte.
 */


/**
 * @swagger
 * /users/companyRegister:
 *   post:
 *     summary: Create a new user company informations or link to an existing company informations
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Votre compte a bien été créé.
 *       500:
 *         description: Une erreur est survenue lors de la création de votre compte.
 */


/**
 * @swagger
 * /users/studentRegister:
 *   post:
 *     summary: Create a new user student informations
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Votre compte a bien été créé.
 *       500:
 *         description: Une erreur est survenue lors de la création de votre compte.
 */


/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Connect to an user account
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Utilisateur connecté avec succès.
 *       401:
 *         description: Email ou mot de passe incorrect.
 *       404:
 *         description: Aucun compte ne correspond à cet email.
 *       500:
 *         description: Erreur lors du traitement des données.
 */


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get the connect user informations
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Informations de l'utilisateur récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       403:
 *         description: Token manquant ou invalide.
 *       404:
 *         description: Utilisateur non trouvé.
 *       500:
 *         description: Erreur lors du traitement des données.
 *   put:
 *     summary: Update the connect user informations
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Vos informations ont bien été mises à jour.
 *       403:
 *         description: Token manquant ou invalide.
 *       404:
 *         description: Utilisateur non trouvé.
 *       500:
 *         description: Erreur lors du traitement des données.
 *   delete:
 *     summary: Delete the connect user account
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Vos informations ont bien été mises à jour.
 *       403:
 *         description: Token manquant ou invalide.
 *       404:
 *         description: Utilisateur non trouvé.
 *       500:
 *         description: Erreur lors du traitement des données.
 */