"use client";

import { useEffect, useState } from "react";
import { Minus, Plus, Eye, EyeOff } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { addPayer, messageClear,updatePayer } from "../../src/store/reducers/payerReducer"; // import it
import { Calendar28 } from "@/components/date-picker";

import { Button } from "@/components/ui/button";

// import { useDispatch } from "react-redux";
import { PaymentMethodDropbox } from "./paymentMethod";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

export function PayerAddForm({
  // open,
  onOpenChange,
  isEditing,
  selectedRow,
  // setIsEditing,
  setSelectedRow
}) {
  const dispatch = useDispatch();

  const [payersInfo, setPayersInfo] = useState({
    name: "",
    contact: "",
  });

  console.log(payersInfo);
  console.log("payersInfo");

  const [error, setError] = useState("");

  // const [passHighlight, setPassHighlight] = useState(false);

  const { successMessage, errorMessage } = useSelector((state) => state.payer);

  const handleAddPayer = async (e) => {
    e.preventDefault();
    try {
      if (!payersInfo.name || !payersInfo.contact) {
        toast.error("Name and Contact Info is Required");
        // setPassHighlight(true);
        return;
      }

      if (isEditing) {
        dispatch(
          updatePayer({
            name: payersInfo.name,
            contact: payersInfo.contact,
            id: selectedRow._id
          })
        );
      } else {
        dispatch(
          addPayer({
            name: payersInfo.name,
            contact: payersInfo.contact,
          })
        );
      }
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setPayersInfo({
        name: "",
        contact: "",
      });
      setSelectedRow(null)
      
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch, onOpenChange, setSelectedRow]);

  useEffect(() => {
    if (selectedRow) {
      setPayersInfo({
        name: selectedRow.name,
        contact: selectedRow.contact,
      });
    }
  }, [selectedRow]);

  const inputHandle = (e) => {
    setPayersInfo({
      ...payersInfo,
      [e.target.name]: e.target.value,
    });
  };

  
  return (
    <div className="p-4 pb-0 mt-3 w-full md:w-10/12">
      <h2 className="font-bold uppercase text-center text-xl mb-3">
        Add Payer
      </h2>
      <form onSubmit={handleAddPayer}>
        <div className="flex flex-col  gap-6 text-slate-100">
          <div className="grid gap-3">
            <Label htmlFor="email">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={payersInfo.name}
              onChange={inputHandle}
              required
              placeholder="Payer Name"
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="email">Contact</Label>
            <Input
              id="contact"
              name="contact"
              type="number"
              value={payersInfo.contact}
              onChange={inputHandle}
              required
              placeholder="Contact"
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div className="flex flex-col gap-3">
            <Button
              type="submit"
              onClick={() => console.log("Submit payment for:", selectedRow)}
            >
              {isEditing ? "Update info" : "Add Payer"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
