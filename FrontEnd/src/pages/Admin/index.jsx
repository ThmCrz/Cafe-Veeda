import 'react-loading-skeleton/dist/skeleton.css';

import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import { connect } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { getSellingReport } from '../../utils/dataProvider/admin';
import useDocumentTitle from '../../utils/documentTitle';
import {
  n_f,
  short_n_f,
} from '../../utils/helpers';

const AdminDashboard = (props) => {
  useDocumentTitle("Admin Dashboard");
  const [data, setData] = useState([]);

  // const data = [
  //   { label: "A", value: 300000 },
  //   { label: "B", value: 500000 },
  //   { label: "C", value: 200000 },
  //   { label: "D", value: 700000 },
  //   { label: "E", value: 450000 },
  //   { label: "F", value: 490000 },
  // ];

  const [searchParams, setSearchParams] = useSearchParams();
  const view = searchParams.get("view");
  // const controller = useMemo(() => new AbortController(), [view]);
  const [loading, setLoading] = useState(true);

  const fetch = async (controller) => {
    setLoading(true);
    getSellingReport(searchParams.get("view"), props.userInfo.token, controller)
      .then((result) => {
        const { data } = result.data;
        setData(data.reverse());
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setLoading(false);
        console.log(err);
      })
      .finally(() => {});
  };
  useEffect(() => {
    const controller = new AbortController();
    fetch(controller);
    return () => {
      controller.abort();
      setLoading(true);
    };
  }, [view]);
  let title = "";
  let subtitle = "";
  switch (view) {
    case "daily":
      title = "Daily Report";
      subtitle = "Last 7 days include today";
      break;
    case "weekly":
      title = "Weekly Report";
      subtitle = "Last 7 week include current week";
      break;

    default:
      title = "Monthly Report";
      subtitle = "Last 6 months";
      break;
  }

  // Find the maximum value in the dataset
  const maxValue = Math.max(...data.map((item) => item.total_sum));
  return (
    <>
      <Header />
      <main className="bg-[#F0F0F0]">
        <section className="flex flex-col global-px py-4 md:py-8">
          <p className="text-center text-tertiary font-bold text-2xl">
            See how your store progress so far
          </p>
          <div className="flex gap-12 justify-center pt-5">
            <div
              className="flex flex-col items-center gap-2 cursor-pointer w-12"
              onClick={() => setSearchParams({ view: "daily" })}
            >
              <div
                className={`h-8 w-8 border-8 rounded-full duration-200 ${
                  view === "daily"
                    ? "bg-secondary border-tertiary"
                    : "bg-white border-gray-400"
                }`}
              ></div>
              <p className={`${view === "daily" && "font-bold"} `}>Daily</p>
            </div>
            <div
              className="flex flex-col items-center gap-2 cursor-pointer w-12"
              onClick={() => setSearchParams({ view: "weekly" })}
            >
              <div
                className={`h-8 w-8 border-8 rounded-full duration-200 ${
                  view === "weekly"
                    ? "bg-secondary border-tertiary"
                    : "bg-white border-gray-400"
                }`}
              ></div>
              <p className={`${view === "weekly" && "font-bold"}`}>Weekly</p>
            </div>
            <div
              onClick={() => setSearchParams({ view: "monthly" })}
              className="flex flex-col items-center gap-2 cursor-pointer w-12"
            >
              <div
                className={`h-8 w-8 border-8 rounded-full duration-200 ${
                  view !== "weekly" && view !== "daily"
                    ? "bg-secondary border-tertiary"
                    : "bg-white border-gray-400"
                }`}
              ></div>
              <p
                className={`${
                  view !== "weekly" && view !== "daily" && "font-bold"
                }`}
              >
                Monthly
              </p>
            </div>
          </div>
        </section>
        <section className="flex flex-col md:flex-row global-px py-4 md:py-8 gap-8">
          {loading || data.length < 1 ? (
            <section className="flex-[5_5_0%]">
              <Skeleton
                className="flex-[5_5_0%] h-[600px] md:h-full"
                baseColor="#ccc"
                width="100%"
              />
            </section>
          ) : (
            <section className="flex-[5_5_0%] flex flex-col bg-white rounded-lg shadow-lg p-8">
              <p className="text-xl md:text-2xl font-bold text-black">
                {title}
              </p>
              <p className="text-base md:text-lg text-primary-context mt-2">
                {subtitle}
              </p>
              <section className="flex gap-2 md:gap-5 mt-5 md:mt-auto mb-5">
                <div className="hidden md:flex h-96 flex-col justify-between">
                  <span className="text-primary-context text-sm md:text-base lg:text-lg">
                    PHP {short_n_f(maxValue)}
                  </span>
                  <span className="text-primary-context text-sm md:text-base lg:text-lg">
                    PHP {short_n_f(maxValue / 2)}
                  </span>
                  <span className="text-primary-context mb-5 text-sm md:text-base lg:text-lg">
                    PHP 0
                  </span>
                </div>
                <div className="flex items-end h-96 relative justify-between flex-1">
                  <div className="absolute h-1 border-b border-dotted border-primary-context w-full bottom-8"></div>
                  {data.map((item, key) => (
                    <div
                      key={`${item.month}-${item.year}-${key}`}
                      className="flex flex-col items-center md:mx-2 lg:mx-4 h-full"
                    >
                      <div
                        style={{
                          height: `${(item.total_sum / maxValue) * 100}%`,
                        }}
                        className="bg-secondary mb-2 w-5 rounded-md mt-auto relative group"
                      >
                        <div className=" absolute hidden group-hover:block bg-tertiary/80 backdrop-blur-md p-3 text-white rounded-lg z-20 -top-10">
                          <p>{n_f(item.total_sum)}</p>
                        </div>
                      </div>
                      <span
                        className={`text-primary-context mt-2 h-6 text-center ${
                          item.label.length > 3
                            ? "text-xs sm:text-sm"
                            : "text-sm sm:text-base md:text-lg"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
              <hr />
              <div className="mt-5 flex flex-row justify-center items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-secondary"></div>{" "}
                <p className="text-sm text-primary-context">Income</p>
              </div>
            </section>
          )}
         
        </section>
        <section className="flex global-px pb-8 gap-8">
          <section className="flex-1 md:flex-[5_5_0%] flex bg-tertiary rounded-lg hover:bg-primary-focus duration-200 group">
            <button className="btn btn-block btn-primary btn-lg text-white normal-case text-lg group-hover:bg-primary-focus border-0">
              Download Report
            </button>
          </section>
          <section className="flex-1 md:flex-[2_2_0%] flex flex-col gap-8">
            <button className="btn btn-block btn-primary btn-lg text-white normal-case text-lg">
              Share Report
            </button>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
