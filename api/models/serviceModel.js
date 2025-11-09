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
      default: 'Explore our portfolio of succesful web projects',
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
        packageTitle: {
          type: String,
          trim: true,
          required: [true, 'A pricing plan must have a title'],
        },
        packageSubtitle: {
          type: String,
          trim: true,
          required: false,
        },
        price: {
          usd: {
            type: Number,
            min: 0,
            required: [true, 'A pricing package must have a usd value'],
          },
          ngn: {
            type: Number,
            min: 0,
            required: [true, 'A pricing pacakge must have a ngn value'],
          },
        },
        benefit: {
          type: [String],
          required: [true, 'A pricing package must have a benefit'],
          validate: {
            validator: function (arr) {
              return arr.length >= 1;
            },
          },
          message: 'At least one feature must be specified for the package',
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

serviceSchema.pre('save', function (next) {
  if (this.isModified('name') && !this.isModified('slug')) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }

  next();
});

serviceSchema.pre('save', function (next) {
  // Capitalize each word
  const capitalizeWords = (str) => {
    str.replace(/\b\w/g, (char) => char.toUpperCase());

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
    if (this.recentProjects) {
      this.recentProjects.forEach((project) => {
        if (project.title) project.title = capitalizeWords(project.title);
        if (project.industry)
          project.industry = capitalizeWords(project.industry);
      });
    }
    if (this.heroButtons) {
      if (this.heroHeroButtons.primary)
        this.heroButtons.primary = capitalizeWords(this.heroButtons.primary);
      if (this.heroButtons.secondary)
        this.heroButtons.secondary = capitalizeWords(
          this.heroButtons.secondary
        );
    }
    if (this.pricingPackage) {
      this.pricingPackage.forEach((pkg) => {
        if (pkg.title) pkg.title = capitalizeWords(pkg.title);
      });
    }
    if (this.pricingPackage.pricingPlans) {
      this.pricingPackage.pricingPlans.forEach((plan) => {
        if (plan.title) plan.title = capitalizeWords(plan.title);
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
  };
  next();
});

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;
