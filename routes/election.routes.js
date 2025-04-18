import express from "express";
import {
    createElectionController,
    getElectionByIdController,
    getAllElectionsController,
    updateElectionController,
    deleteElectionController,
    getUsersInElectionController,
    registerUserForElectionController,
    unregisterUserForElectionController,
    createQuestionController,
    getAllQuestionsController,
    getQuestionByElectionIdController,
    getAllCandidatesController,
    getCandidatesByQuestionIdController,
    deleteQuestionController,
    deleteCandidateController,
    updateQuestionController,
    updateCandidateController,
    createCandidateController,
    getUserElectionsController,
    updateResultsVisibility,
    publishElectionResults,
    launchElection,
} from "../controllers/election.controller.js";
import { authenticate } from "../middleware/authMiddleware.js"; // Fixed import
import { isAdmin, hasRole } from "../middleware/admin.middleware.js";

const router = express.Router();

// CRUD Operations - Only Admins/Commissioners should have access
router.post(
    "/createElection",
    authenticate,
    //hasRole(["super_admin", "commissioner", "admin"]), // Adjust Permissions Here
    createElectionController
);

router.get("/:id", authenticate, getElectionByIdController); // Can get all elections by user with authentication, modify later as needed
router.get("/", authenticate, getAllElectionsController);   // Can get elections

router.put(
    "/:id",
    authenticate,
    isAdmin,
    hasRole(["super_admin", "commissioner", "admin"]), // Only commissioner and admin allow update
    updateElectionController
);

router.delete(
    "/:id",
    authenticate,
    isAdmin,
    hasRole(["super_admin", "commissioner", "admin"]),  // Only Commissioner allow Delete.
    deleteElectionController
);

// Operations Regarding user for elections like registering in election,
router.get("/:id/users", authenticate, isAdmin, hasRole(["super_admin", "commissioner"]), getUsersInElectionController);


router.post("/createQuestion", authenticate, isAdmin, hasRole(["super_admin", "commissioner", "admin"]), createQuestionController )
router.post("/createCandidate", authenticate, isAdmin, hasRole(["super_admin", "commissioner", "admin"]), createCandidateController )

router.get("/getAllQuestions", authenticate, getAllQuestionsController);
router.get("/getAllQuestions/:id", authenticate, getQuestionByElectionIdController);

router.get("/getAllCandidates", authenticate, getAllCandidatesController);
router.get("/getAllCandidates/:id", authenticate, getCandidatesByQuestionIdController);


router.delete(
    "/deleteQuestion/:id",
    authenticate,
    isAdmin,
    hasRole(["super_admin", "commissioner", "admin"]),  // Only Commissioner allow Delete.
    deleteQuestionController
);

router.delete(
    "/deleteCandidate/:id",
    authenticate,
    isAdmin,
    hasRole(["super_admin", "commissioner", "admin"]),  // Only Commissioner allow Delete.
    deleteCandidateController
);

router.put(
    "/updateQuestion/:id",
    authenticate,
    isAdmin,
    hasRole(["super_admin", "commissioner", "admin"]), // Only commissioner and admin allow update
    updateQuestionController
);

router.put(
    "/updateCandidate/:id",
    authenticate,
    isAdmin,
    hasRole(["super_admin", "commissioner", "admin"]), // Only commissioner and admin allow update
    updateCandidateController
);

router.put(
    "/:id/results-visibility",
    authenticate,
    updateResultsVisibility,
    hasRole(["super_admin", "commissioner", "admin"])
  )
  
  // Publish election results
  router.post("/:id/publish",authenticate, publishElectionResults)

  router.post("/:id/launch",authenticate, launchElection)

export default router;
