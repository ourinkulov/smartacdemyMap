import { useTranslation } from "react-i18next";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { IAuth } from "redux/dataStored/authReducer";
import { setTeacherRating } from "../../utils/Requests";
import toast from "react-hot-toast";

type Props = {
  subject: any;
  showAssessment: boolean;
  setShowAssessment: (value: boolean) => void;
};

export default function TeacherAssessment({
  subject,
  showAssessment,
  setShowAssessment,
}: Props) {
  const { t } = useTranslation<string>();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const evaluatorId = useSelector((state: IAuth) => state.auth.userdata?.id);

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTeacherRating(subject.id, 783, rating, comment, evaluatorId).then(
      (response: any) => {
        if (response.status == 200) {
          setShowAssessment(false);
          toast.success(t("success"));
        } else {
          toast.error(t("error"));
        }
      }
    );
    console.log({ ...subject, rating, comment, evaluatorId });
  };

  return (
    <Dialog
      as="div"
      open={showAssessment}
      onClose={() => setShowAssessment(false)}
      className="absolute top-1/2 left-32 transform -translate-y-1/2 z-[100]"
    >
      <Dialog.Panel className="flex flex-col border border-gray-200 dark:border-gray-500 bg-white dark:bg-slate-700 items-center justify-center overflow-hidden rounded-lg p-6 text-left align-middle shadow-md shadow-[#313f8550] transition-all">
        <form
          onSubmit={handleSubmit}
          className="w-[40vw] mx-auto px-4 py-2 rounded-lg"
        >
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-slate-300 font-bold mb-2">
              {t("testcenterpage.subject_name")}
            </label>
            <input
              type="text"
              value={subject?.subject_name}
              readOnly
              className="w-full px-3 py-2 border dark:border-slate-600 rounded-md bg-gray-100 dark:bg-slate-800 dark:text-slate-200 cursor-not-allowed"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-slate-300 font-bold mb-2">
              {t("testcenterpage.teacher_name")}
            </label>
            <input
              type="text"
              value={subject?.employee_fio}
              readOnly
              className="w-full px-3 py-2 border dark:border-slate-600 rounded-md bg-gray-100 dark:bg-slate-800 dark:text-slate-200 cursor-not-allowed"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-slate-300 font-bold mb-2">
              {t("testcenterpage.date")}
            </label>
            <input
              type="text"
              value={subject?.lesson_date}
              readOnly
              className="w-full px-3 py-2 border dark:border-slate-600 rounded-md bg-gray-100 dark:bg-slate-800 dark:text-slate-200 cursor-not-allowed"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-slate-300 font-bold mb-2">
              {t("testcenterpage.lesson_time")}
            </label>
            <input
              type="text"
              value={subject?.lesson_time}
              readOnly
              className="w-full px-3 py-2 border dark:border-slate-600 rounded-md bg-gray-100 dark:bg-slate-800 dark:text-slate-200 cursor-not-allowed"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-slate-300 font-bold mb-2">
              {t("testcenterpage.grade")}
            </label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  className={`text-4xl ${
                    star <= rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                  onClick={() => handleRatingChange(star)}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-slate-300 font-bold mb-2">
              {t("testcenterpage.comment")}
            </label>
            <textarea
              value={comment}
              onChange={handleCommentChange}
              className="w-full px-3 py-2 border rounded-md"
              rows={4}
              placeholder={t("testcenterpage.write_comment")}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-[#14059c] dark:bg-toggleBackground hover:bg-[#14059cd9] hover:dark:bg-[#f59504e4] text-white font-bold py-2 px-4 rounded-md "
          >
            {t("testcenterpage.send")}
          </button>
        </form>
      </Dialog.Panel>
    </Dialog>
  );
}
