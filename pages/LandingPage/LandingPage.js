import css from './LandingPage.module.css';
import classNames from 'classnames';

/*
import cellLineImage from '../../src/assets/images/sampletype_cell_line.jpg';
import tissueImage from '../../src/assets/images/sampletype_tissue.jpg';
import microbiomeImage from '../../src/assets/images/sampletype_environmental.jpg';
import diseaseImage from '../../src/assets/images/sampletype_covid.png';
import howItWorks from '../../src/assets/images/how_it_works.png';
*/

export default function LandingPage() {
    return (
        <>
            <div className={css.Hero}>
                <div className="row">
                    <div className={classNames(css.HeroTextContainer, "col-8", "offset-2")}>
                        <h1>
                            Find the resources you need across a global research ecosystem
                        </h1>
                        <h2>
                            This is the Virtual Biobank that saves your time and money so you can focus on your research.
                        </h2>
                    </div>
                </div>
                <div className="row">
                    <div className={classNames(css.HeroBtnContainer)}>
                        <a href="/items" className={classNames(css.HeroBtn, "btn", "btn-primary")} role="button">
                            Search Catalog
                        </a>
                        <a href="/sign-in" className={classNames(css.HeroBtn, "btn", "btn-secondary")} role="button">
                            Share Specimens
                        </a>
                    </div>
                </div>
                <div className="row">
                    <div className={classNames(css.HeroCard, "card", "col-2", "offset-2")}>
                        <div className="card-header">
                            Cells
                        </div>
                        <img className="card-img" src='/images/sampletype_cell_line.jpg' alt="Cells" />
                    </div>
                    <div className={classNames("card", css.HeroCard, "col-2", "offset-0")}>
                        <div className="card-header">
                            Tissue
                        </div>
                        <img className="card-img" src='/images/sampletype_tissue.jpg' alt="Tissue" />
                    </div>
                    <div className={classNames(css.HeroCard, "card", "col-2", "offset-0")}>
                        <div className="card-header">
                            Microbiome
                        </div>
                        <img className="card-img" src='/images/sampletype_environmental.jpg' alt="Microbiome" />
                    </div>
                    <div className={classNames(css.HeroCard, "card", "col-2", "offset-0")}>
                        <div className="card-header">
                            Disease-specific
                        </div>
                        <img className="card-img" src='/images/sampletype_covid.jpg' alt="Disease-specific" />
                    </div>
                </div>
            </div>
            <div className='row'>
            <div className={classNames(css.SectionContainer, "col-8", "offset-2")}>
                <h1>How it works</h1>
                    <img src="/images/how_it_works.png" alt="How it works" width="100%"/>
                </div>
            </div>
        </>
    )
}
