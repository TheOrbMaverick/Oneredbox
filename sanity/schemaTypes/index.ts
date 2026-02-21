import { type SchemaTypeDefinition } from "sanity";
import { buildingDesign } from "./buildingDesign";
import {
  clientProject,
  projectFinancials,
  projectMedia,
  projectMilestone,
} from "./clientProject";
import { constructionSupervision } from "./constructionSupervision";
import { landAcquisition } from "./landAcquisition";
import { property } from "./property";
import { testimonial } from "./heroTestimonial";
import { ClientType } from "./clientType";
import { portfolioGalleryType } from "./portfolioGallery";
import { sectionTestimonial } from "./testimonials";
import { demoProject } from "./demoProject";
import { projectManager } from "./projectManager";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    clientProject,
    projectFinancials,
    projectMedia,
    projectMilestone,
    landAcquisition,
    buildingDesign,
    constructionSupervision,
    property,
    testimonial,
    ClientType,
    portfolioGalleryType,
    sectionTestimonial,
    demoProject,
    projectManager,
  ],
};
