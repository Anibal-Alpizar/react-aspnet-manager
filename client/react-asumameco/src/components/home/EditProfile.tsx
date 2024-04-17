import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import TextInput from "./TextInput";
import { CustomButton } from ".";

function EditProfile() {
  const { user, updateUser } = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues: { ...user },
  });

  const [isModalOpen, setModalOpen] = useState<boolean>(true);

  const handleClose = () => {
    setModalOpen(false);
  };

  const onSubmit = handleSubmit(async (data: any) => {
    if (!user) return;
    const res = await updateUser(user.id, data);
    alert(res);
    handleClose();
    window.location.reload();
  });

  return (
    <>
      {isModalOpen && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-[#000] opacity-70"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div
              className="inline-block align-bottom bg-primary rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="flex justify-between px-6 py-5 pb-2">
                <label
                  htmlFor="name"
                  className="block font-medium text-xl text-ascent-1 text-left"
                >
                  Edit Profile
                </label>

                <button className="text-ascent-1" onClick={handleClose}>
                  <MdClose size={22} />
                </button>
              </div>
              <form
                onSubmit={onSubmit}
                className="px-4 sm:px-6 flex flex-col gap-3 2xl:gap-6"
              >
                <TextInput
                  label="Nombre"
                  placeholder="Name"
                  type="text"
                  styles="w-full"
                  register={register("nombre", {
                    required: "Name is required",
                  })}
                  error={errors.nombre ? errors.nombre.message : ""}
                />
                <TextInput
                  label="Apellidos"
                  placeholder="Last Name"
                  type="text"
                  styles="w-full"
                  register={register("apellidos", {
                    required: "Last Name is required",
                  })}
                  error={errors.apellidos ? errors.apellidos.message : ""}
                />

                <div className="py-5 sm:flex sm:flex-row-reverse border-b border-[#66666645]">
                  <CustomButton
                    type="submit"
                    containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none`}
                    title="Actualizar"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EditProfile;
