const mongoose = require('mongoose');
const slugify = require('slugify');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A service must have a name'],
    unique: true,
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  summary: {
    type: String,
    required: [true, 'A service must have a summary'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'A service must have a description'],
    trim: true,
  },
  heroButtons: {
    primary: {
      type: String,
      default: 'Get Started',
    },
    secondary: {
      type: String,
      default: 'View our works',
    },
  },
  heroImage: [String], //for carousel images

  whyWork: {
    description: {
      type: String,
      required: [true, 'A service must have a why work description'],
      trim: true,
    },
    reasons: [
      {
        title: {
          type: String,
          required: [true, 'A reason must have a title'],
          trim: true,
        },
        description: {
          type: String,
          required: [true, 'A reason must have a description'],
          trim: true,
        },
        image: {
          type: String,
          required: [true, 'A reason must have an image'],
        },
      },
    ],
  },

  process: {
    title: {
      type: String,
      required: [true, 'A service process must have a title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'A service process must have a description'],
      trim: true,
    },
    steps: [
      {
        title: {
          type: String,
          trim: true,
          required: [true, 'Process must have a step'],
        },
        description: {
          type: String,
          trim: true,
          required: [true, 'Process step must have a description'],
        },
        image: {
          type: String,
          required: [true, 'Process step must have an image'],
        },
      },
    ],
  },

  recentProjects: {
    subtitle: {
      type: String,
      trim: true,
      default: 'Explore our portfolio of succesful projects',
    },
    projects: [
      {
        title: {
          type: String,
          trim: true,
          required: [true, 'Recent project must have a title'],
        },

        industry: {
          type: String,
          trim: true,
          required: [true, 'Recent project must have an industry'],
        },
        image: {
          type: String,
          required: [true, 'Recent project must have an image'],
        },
      },
    ],
  },

  pricingPackage: {
    title: {
      type: String,
      trim: true,
      default: 'Our Pricing Packages',
    },
    subtitle: {
      type: String,
      trim: true,
      default: 'Transparent pricing designed to fit businesses of all sizes.',
    },
    pricingPlans: [
      {
        planTitle: {
          type: String,
          trim: true,
          required: [true, 'A pricing plan must have a title'],
        },
        planSubtitle: {
          type: String,
          trim: true,
          required: false,
        },
        price: {
          usd: {
            type: Number,
            min: 0,
            required: [true, 'A pricing plan must have a usd value'],
          },
          ngn: {
            type: Number,
            min: 0,
            required: [true, 'A pricing pacakge must have a ngn value'],
          },
        },
        benefit: {
          type: [String],
          required: [true, 'A pricing plan must have a benefit'],
          validate: {
            validator: function (arr) {
              return arr.length >= 1;
            },
          },
          message: 'At least one feature must be specified for the plan',
        },
        duration: {
          minDays: {
            type: Number,
            required: [true, 'Please specify the minimum duration in days'],
            min: [1, 'Minimum duration must be at least 1 day'],
          },
          maxDays: {
            type: Number,
            required: [true, 'Please specify the maximum duration in days'],
            validate: {
              validator: function (val) {
                return val > this.duration.minDays;
              },
            },
            message: 'Maximum duration must be greater than minimum duration',
          },
        },
      },
    ],
  },

  readySection: {
    title: {
      type: String,
      trim: true,
      required: [true, 'Ready section must have a title'],
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'Ready section must have a description'],
    },
    readyButton: {
      primary: {
        type: String,
        trim: true,
        default: 'Get Started',
      },
      secondary: {
        type: String,
        trim: true,
        default: 'Contact Us',
      },
    },
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  isRecommended: { type: Boolean, default: false },
  isMostPopular: { type: Boolean, default: false },
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
serviceSchema.pre('save', async function (next) {
  if (!this.slug) {
    // Define a base slug
    const baseSlug = slugify(this.name, { lower: true });
    let slug = baseSlug;
    let counter = 1;

    // Check if slug already exists
    while (await this.constructor.findOne({ slug })) {
      slug = `${baseSlug}-${counter++}`;
    }

    this.slug = slug;
  }
  next();
});

// Generate slug from name if name is modified and slug is not modified
serviceSchema.pre('save', function (next) {
  if (this.isModified('name') && !this.isModified('slug')) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }

  next();
});

// Capitalization middleware
serviceSchema.pre('save', function (next) {
  // Capitalize each word
  const capitalizeWords = (str) => {
    if (typeof str !== 'string') return str;
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // Apply to specific fields
  if (this.name) this.name = capitalizeWords(this.name);

  if (this.whyWork.reasons) {
    this.whyWork.reasons.forEach((reason) => {
      if (reason.title) reason.title = capitalizeWords(reason.title);
    });
  }

  if (this.process.title)
    this.process.title = capitalizeWords(this.process.title);

  if (this.process.steps) {
    this.process.steps.forEach((step) => {
      if (step.title) step.title = capitalizeWords(step.title);
    });
  }

  if (this.recentProjects.projects) {
    this.recentProjects.projects.forEach((project) => {
      if (project.title) project.title = capitalizeWords(project.title);
      if (project.industry)
        project.industry = capitalizeWords(project.industry);
    });
  }

  if (this.heroButtons) {
    if (this.heroButtons.primary)
      this.heroButtons.primary = capitalizeWords(this.heroButtons.primary);
    if (this.heroButtons.secondary)
      this.heroButtons.secondary = capitalizeWords(this.heroButtons.secondary);
  }

  if (this.pricingPackage.title) {
    this.pricingPackage.title = capitalizeWords(this.pricingPackage.title);
  }

  if (this.pricingPackage.pricingPlans) {
    this.pricingPackage.pricingPlans.forEach((plan) => {
      if (plan.planTitle) plan.planTitle = capitalizeWords(plan.planTitle);
    });
  }

  if (this.readySection) {
    if (this.readySection.title) {
      this.readySection.title = capitalizeWords(this.readySection.title);
    }
    if (this.readySection.readyButton) {
      if (this.readySection.readyButton.primary) {
        this.readySection.readyButton.primary = capitalizeWords(
          this.readySection.readyButton.primary
        );
      }
      if (this.readySection.readyButton.secondary) {
        this.readySection.readyButton.secondary = capitalizeWords(
          this.readySection.readyButton.secondary
        );
      }
    }
  }

  next();
});

// serviceSchema.pre('save', function (next) {
//   // Capitalize each word
//   const capitalizeWords = (str) =>
//     str.replace(/\b\w/g, (char) => char.toUpperCase());

//   const capitalizeIfExists = (obj, key) => {
//     if (obj && obj[key]) obj[key] = capitalizeWords(obj[key]);
//   };

//   const capitalizeArrayFields = (arr, fields) => {
//     if (Array.isArray(arr)) {
//       arr.forEach((item) => {
//         fields.forEach((field) => capitalizeIfExists(item, field));
//       });
//     }
//   };

//   // --- Apply capitalizations ---
//   capitalizeIfExists(this, 'name');

//   if (this.whyWork) capitalizeArrayFields(this.whyWork.reasons, ['title']);
//   if (this.process) {
//     capitalizeIfExists(this.process, 'title');
//     capitalizeArrayFields(this.process.steps, ['title']);
//   }
//   capitalizeArrayFields(this.recentProjects, ['title', 'industry']);

//   if (this.heroButtons) {
//     capitalizeIfExists(this.heroButtons, 'primary');
//     capitalizeIfExists(this.heroButtons, 'secondary');
//   }

//   capitalizeArrayFields(this.pricingPackage, ['title']);
//   if (this.pricingPackage?.pricingPlans) {
//     capitalizeArrayFields(this.pricingPackage.pricingPlans, ['title']);
//   }

//   if (this.readySection) {
//     capitalizeIfExists(this.readySection, 'title');
//     if (this.readySection.readyButton) {
//       capitalizeIfExists(this.readySection.readyButton, 'primary');
//       capitalizeIfExists(this.readySection.readyButton, 'secondary');
//     }
//   }

//   next();
// });

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;
