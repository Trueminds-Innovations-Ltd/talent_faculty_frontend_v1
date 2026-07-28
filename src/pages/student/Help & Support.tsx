import HelpCard from "../../components/common/HelpCard";
import ArticleList from "../../components/common/ArticleList";
import SupportCard from "../../components/common/SupportCard";
import DashboardLayout from '../../components/layout/DashboardLayout'

const HelpCenter = () => {
    return (
        <DashboardLayout title="Help & Support" subtitle="We're here to help you.">
            <div className="min-h-screen bg-white p-8">
                <div className="mx-auto max-w-7xl">


                    <div className="grid gap-6 md:grid-cols-3">
                        <HelpCard
                            title="Help Center"
                            description="Browse articles and our guides"
                        />

                        <HelpCard
                            title="Contact Support"
                            description="Get help from our team"
                        />

                        <HelpCard
                            title="Report a Bug"
                            description="Help us improve"
                        />
                    </div>


                    <div className="mt-8 grid gap-6 lg:grid-cols-2">
                        <ArticleList />
                        <SupportCard />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default HelpCenter;